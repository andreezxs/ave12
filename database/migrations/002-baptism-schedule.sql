UPDATE schedules
SET
  title = 'Horários de Batizados',
  items = '[
    "Capela 8h da manhã - R$ 200,00",
    "1° 3° e 5° Domingo - Diac. Sérgio",
    "2° e 4° Domingo - Diac. Leocir",
    "Matriz - 8h da manhã",
    "2° e 4° Domingo - Diac. Sérgio",
    "3° e 5° Domingo - Diac. Leocir",
    "Para agendar seu casamento - mediante agendamento na Secretaria paroquial"
  ]'::jsonb
WHERE title = 'Batizados e Casamentos';
