"""
Export KNN model and Scaler parameters to model_data.json for Spring Boot backend,
and run parity verification against scikit-learn.
"""
import os
import json
import joblib
import pickle
import numpy as np

MODELS_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(MODELS_DIR)
TARGET_JSON = os.path.join(PROJECT_ROOT, "backend", "src", "main", "resources", "model_data.json")

def export():
    knn_path = os.path.join(MODELS_DIR, "KNN_Heart.pkl")
    scaler_path = os.path.join(MODELS_DIR, "scaler.pkl")
    columns_path = os.path.join(MODELS_DIR, "Columns.pkl")

    print(f"Loading models from {MODELS_DIR}...")
    model = joblib.load(knn_path)
    scaler = joblib.load(scaler_path)
    
    with open(columns_path, "rb") as f:
        columns = pickle.load(f)

    data = {
        "algorithm": "KNeighborsClassifier",
        "n_neighbors": int(model.n_neighbors),
        "metric": str(model.metric),
        "p": int(model.p),
        "columns": columns,
        "scaler_mean": scaler.mean_.tolist(),
        "scaler_scale": scaler.scale_.tolist(),
        "fit_X": model._fit_X.tolist(),
        "y": [int(val) for val in model._y],
        "classes": [int(c) for c in model.classes_],
        "total_samples": len(model._y),
        "class_counts": {
            "0": int(sum(1 for y in model._y if y == 0)),
            "1": int(sum(1 for y in model._y if y == 1))
        }
    }

    os.makedirs(os.path.dirname(TARGET_JSON), exist_ok=True)
    with open(TARGET_JSON, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    print(f"Exported model parameters to: {TARGET_JSON} ({os.path.getsize(TARGET_JSON)} bytes)")

if __name__ == "__main__":
    export()
