import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

const regionColors = ["#0f766e", "#2563eb", "#c2410c", "#7c3aed", "#a16207", "#be185d", "#0e7490"];

function parseCoordinates(text: string): Array<[number, number]> {
  const positions: Array<[number, number]> = [];

  for (const coordinate of text.trim().split(/\s+/)) {
    const [longitude, latitude] = coordinate.split(",").map(Number);
    if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
      positions.push([latitude, longitude]);
    }
  }

  return positions;
}

export function CebsMap() {
  const mapElement = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    let active = true;
    let map: import("leaflet").Map | null = null;

    async function loadMap() {
      try {
        const [{ default: L }, response] = await Promise.all([
          import("leaflet"),
          fetch("/cebs-regiao.kml"),
        ]);
        if (!response.ok) {
          throw new Error(`KML request failed with status ${response.status}`);
        }

        const xml = new DOMParser().parseFromString(await response.text(), "application/xml");
        if (xml.getElementsByTagName("parsererror").length > 0) {
          throw new Error("The CEBs KML file could not be parsed");
        }

        const container = mapElement.current;
        if (!active || !container) return;

        const placemarks = Array.from(xml.getElementsByTagNameNS("*", "Placemark"));
        const layers: import("leaflet").Layer[] = [];
        let regionIndex = 0;

        for (const placemark of placemarks) {
          const name =
            placemark.getElementsByTagNameNS("*", "name").item(0)?.textContent?.trim() ||
            "Comunidade";
          const polygon = placemark.getElementsByTagNameNS("*", "Polygon").item(0);
          const point = placemark.getElementsByTagNameNS("*", "Point").item(0);

          if (polygon) {
            const coordinates = polygon
              .getElementsByTagNameNS("*", "coordinates")
              .item(0)?.textContent;
            const positions = coordinates ? parseCoordinates(coordinates) : [];

            if (positions.length >= 3) {
              const color = regionColors[regionIndex % regionColors.length];
              regionIndex += 1;
              layers.push(
                L.polygon(positions, {
                  color,
                  fillColor: color,
                  fillOpacity: 0.18,
                  weight: 2,
                }).bindPopup(name),
              );
            }
          }

          if (point) {
            const coordinates = point
              .getElementsByTagNameNS("*", "coordinates")
              .item(0)?.textContent;
            const position = coordinates ? parseCoordinates(coordinates)[0] : undefined;

            if (position) {
              const isParish = name.toLocaleLowerCase("pt-BR").includes("paróquia");
              layers.push(
                L.circleMarker(position, {
                  color: "#ffffff",
                  fillColor: isParish ? "#b91c1c" : "#b45309",
                  fillOpacity: 1,
                  radius: isParish ? 8 : 6,
                  weight: 2,
                }).bindPopup(name),
              );
            }
          }
        }

        if (layers.length === 0) {
          throw new Error("The CEBs KML file contains no map features");
        }

        map = L.map(container, { scrollWheelZoom: false });
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(map);

        const featureGroup = L.featureGroup(layers).addTo(map);
        const bounds = featureGroup.getBounds();
        if (!bounds.isValid()) {
          throw new Error("The CEBs KML file contains invalid map coordinates");
        }
        map.fitBounds(bounds.pad(0.1), { maxZoom: 15 });

        if (active) setMapReady(true);
      } catch (error) {
        console.error("Unable to load the CEBs map", error);
        if (active) setMapError(true);
      }
    }

    void loadMap();

    return () => {
      active = false;
      map?.remove();
    };
  }, []);

  return (
    <div className="mt-8 overflow-hidden rounded-3xl border border-border">
      <div
        ref={mapElement}
        className="h-[min(70vh,42rem)] min-h-[26rem] w-full bg-muted"
        role="region"
        aria-label="Mapa interativo das comunidades da paróquia"
      />
      {!mapReady && (
        <div
          className="bg-muted px-4 py-3 text-center text-sm text-muted-foreground"
          role={mapError ? "alert" : "status"}
        >
          {mapError
            ? "Não foi possível carregar o mapa. Tente atualizar a página."
            : "Carregando mapa das comunidades..."}
        </div>
      )}
    </div>
  );
}
