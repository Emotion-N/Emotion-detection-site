import js
from pyodide.ffi import create_proxy
import numpy as np

def calculate_performance(score, avg_speed):
    max_score = 60  # Assuming 2 clicks per second for 30 seconds
    max_speed = 1000  # Assuming 1000ms as the slowest acceptable speed
    
    score_ratio = min(score / max_score, 1)
    speed_ratio = 1 - min(avg_speed / max_speed, 1)
    
    performance = (score_ratio + speed_ratio) / 2 * 100
    return round(performance, 2)

def update_background(performance):
    r = int(255 * (1 - performance / 100))
    g = int(255 * (performance / 100))
    b = 100
    
    js.document.body.style.background = f"linear-gradient(45deg, rgb({r},{g},{b}), rgb({r+50},{g+50},{b+50}))"

def py_update_performance(score, avg_speed):
    performance = calculate_performance(score, avg_speed)
    js.document.getElementById("performance").textContent = f"{performance}"
    update_background(performance)

update_performance_proxy = create_proxy(py_update_performance)
js.window.pyUpdatePerformance = update_performance_proxy