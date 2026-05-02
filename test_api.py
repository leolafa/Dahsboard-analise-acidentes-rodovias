import urllib.request
import json

# Test the API endpoint
try:
    url = 'http://localhost:8000/api/por-mes/?ano=2025'
    with urllib.request.urlopen(url) as response:
        data = json.loads(response.read())
        print(f"Status: OK")
        print(f"Items count: {len(data)}")
        print(f"Data: {json.dumps(data, indent=2)}")
except Exception as e:
    print(f"Error: {e}")
