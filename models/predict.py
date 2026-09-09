"""
Standalone CLI predictor using joblib models directly.
Example:
    python predict.py --age 55 --sex M --chest-pain ASY --bp 140 --chol 260 --fbs 1 --ecg Normal --max-hr 130 --angina Y --oldpeak 2.0 --st-slope Flat
"""
import os
import argparse
import joblib
import pickle
import numpy as np

MODELS_DIR = os.path.dirname(os.path.abspath(__file__))

def load_models():
    model = joblib.load(os.path.join(MODELS_DIR, "KNN_Heart.pkl"))
    scaler = joblib.load(os.path.join(MODELS_DIR, "scaler.pkl"))
    with open(os.path.join(MODELS_DIR, "Columns.pkl"), "rb") as f:
        columns = pickle.load(f)
    return model, scaler, columns

def predict_patient(data):
    model, scaler, columns = load_models()
    
    # Map input to 15 columns:
    # ['Age', 'RestingBP', 'Cholesterol', 'FastingBS', 'MaxHR', 'Oldpeak', 
    #  'Sex_M', 'ChestPainType_ATA', 'ChestPainType_NAP', 'ChestPainType_TA', 
    #  'RestingECG_Normal', 'RestingECG_ST', 'ExerciseAngina_Y', 'ST_Slope_Flat', 'ST_Slope_Up']
    
    sex_m = 1.0 if str(data.get("sex", "")).upper() == "M" else 0.0
    cpt = str(data.get("chest_pain_type", "")).upper()
    cpt_ata = 1.0 if cpt == "ATA" else 0.0
    cpt_nap = 1.0 if cpt == "NAP" else 0.0
    cpt_ta = 1.0 if cpt == "TA" else 0.0
    
    ecg = str(data.get("resting_ecg", "")).upper()
    ecg_normal = 1.0 if ecg == "NORMAL" else 0.0
    ecg_st = 1.0 if ecg == "ST" else 0.0
    
    angina_y = 1.0 if str(data.get("exercise_angina", "")).upper() in ["Y", "YES", "TRUE", "1"] else 0.0
    
    st = str(data.get("st_slope", "")).upper()
    st_flat = 1.0 if st == "FLAT" else 0.0
    st_up = 1.0 if st == "UP" else 0.0
    
    row = [
        float(data.get("age", 50)),
        float(data.get("resting_bp", 120)),
        float(data.get("cholesterol", 200)),
        float(data.get("fasting_bs", 0)),
        float(data.get("max_hr", 140)),
        float(data.get("oldpeak", 0.0)),
        sex_m,
        cpt_ata,
        cpt_nap,
        cpt_ta,
        ecg_normal,
        ecg_st,
        angina_y,
        st_flat,
        st_up
    ]
    
    row_arr = np.array([row])
    scaled = scaler.transform(row_arr)
    prediction = int(model.predict(scaled)[0])
    probabilities = model.predict_proba(scaled)[0].tolist()
    
    return {
        "prediction": prediction,
        "prediction_label": "High Risk / Heart Disease Detected" if prediction == 1 else "Low Risk / Healthy",
        "healthy_probability": round(probabilities[0], 4),
        "disease_probability": round(probabilities[1], 4),
        "risk_percentage": round(probabilities[1] * 100, 1)
    }

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Heart Disease Predictor")
    parser.add_argument("--age", type=float, default=52)
    parser.add_argument("--sex", type=str, default="M")
    parser.add_argument("--chest-pain", type=str, default="ASY")
    parser.add_argument("--bp", type=float, default=140)
    parser.add_argument("--chol", type=float, default=240)
    parser.add_argument("--fbs", type=int, default=0)
    parser.add_argument("--ecg", type=str, default="Normal")
    parser.add_argument("--max-hr", type=float, default=130)
    parser.add_argument("--angina", type=str, default="Y")
    parser.add_argument("--oldpeak", type=float, default=1.8)
    parser.add_argument("--st-slope", type=str, default="Flat")
    
    args = parser.parse_args()
    res = predict_patient({
        "age": args.age,
        "sex": args.sex,
        "chest_pain_type": args.chest_pain,
        "resting_bp": args.bp,
        "cholesterol": args.chol,
        "fasting_bs": args.fbs,
        "resting_ecg": args.ecg,
        "max_hr": args.max_hr,
        "exercise_angina": args.angina,
        "oldpeak": args.oldpeak,
        "st_slope": args.st_slope
    })
    print("\n=== Heart Disease Prediction Result ===")
    for k, v in res.items():
        print(f"  {k}: {v}")
