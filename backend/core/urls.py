from django.contrib import admin
from django.urls import path
from django.http import HttpResponse
from content.views import get_stories, get_story_detail
from newsletter.views import subscribe

# --- The "Welcome" Page Design ---
def home_view(request):
    html = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Onedottwo System</title>
        <style>
            body { 
                background-color: #111; 
                color: #ddd; 
                font-family: 'Courier New', monospace; 
                display: flex; 
                justify-content: center; 
                align-items: center; 
                height: 100vh; 
                margin: 0; 
            }
            .container { 
                text-align: center; 
                border: 1px solid #333; 
                padding: 40px; 
                border-radius: 8px; 
                background: #1a1a1a; 
                box-shadow: 0 4px 20px rgba(0,0,0,0.5);
            }
            h1 { font-size: 24px; margin-bottom: 5px; color: #fff; letter-spacing: 1px; }
            .status { color: #4ade80; font-size: 12px; margin-bottom: 30px; text-transform: uppercase; }
            .btn { 
                background: #fff; 
                color: #000; 
                padding: 12px 24px; 
                text-decoration: none; 
                border-radius: 4px; 
                font-weight: bold; 
                font-size: 14px;
                transition: all 0.2s;
            }
            .btn:hover { background: #ccc; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>ONEDOTTWO BACKEND</h1>
            <div class="status">● System Operational</div>
            <a href="/admin" class="btn">Enter Control Room</a>
        </div>
    </body>
    </html>
    """
    return HttpResponse(html)

# --- The URL Map ---
urlpatterns = [
    path('', home_view), # <--- This handles the root URL (/)
    path('admin/', admin.site.urls),
    path('api/stories/', get_stories),
    path('api/stories/<slug:slug>/', get_story_detail),
    path('api/newsletter/subscribe/', subscribe),
]