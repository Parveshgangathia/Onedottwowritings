import os
import django

# Setup Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from django.contrib.auth.models import User

# The Logic
username = "admin"
password = "ChangeMe123!" 
email = "admin@example.com"

if not User.objects.filter(username=username).exists():
    print(f"Creating superuser: {username}")
    User.objects.create_superuser(username, email, password)
    print("✅ Superuser created successfully!")
else:
    print("⚠️ Superuser already exists. Skipping.")