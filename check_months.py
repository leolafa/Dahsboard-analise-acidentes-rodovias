import csv

# Read the CSV and extract unique months
dates_set = set()
with open('data/datatran2025.csv', 'r', encoding='utf-8-sig', errors='ignore') as f:
    reader = csv.DictReader(f, delimiter=';')
    for row in reader:
        if 'data_inversa' in row:
            date = row['data_inversa']
            # Format: YYYY-MM-DD, extract year-month
            if len(date) >= 7:
                month = date[:7]
                dates_set.add(month)

months = sorted(list(dates_set))
print(f"Total meses: {len(months)}")
print(f"Meses: {months}")
print(f"Primeiro: {months[0] if months else 'N/A'}")
print(f"Último: {months[-1] if months else 'N/A'}")
