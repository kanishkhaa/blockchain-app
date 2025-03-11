import sys
import json
import pandas as pd
import joblib

def predict_disaster_impact(user_input):
    features = [
        "WRI", "Exposure", "Vulnerability", "Susceptibility", 
        "Lack of Coping Capabilities", "Lack of Adaptive Capacities", 
        "CPI", "Latitude", "Longitude", "Reconstruction Costs ('000 US$)"
    ]

    input_df = pd.DataFrame([user_input])

    scaler = joblib.load("scaler.pkl")
    input_scaled = scaler.transform(input_df[features])
    input_df[features] = input_scaled

    total_deaths_model = joblib.load("Total_Deaths.pkl")
    total_damages_model = joblib.load("Total_Damages_000_US$.pkl")

    total_deaths_pred = total_deaths_model.predict(input_df[features])[0]
    total_damages_pred = total_damages_model.predict(input_df[features])[0]

    result = {
        "Total Deaths": round(total_deaths_pred),
        "Total Damages ('000 US$)": round(total_damages_pred, 2)
    }

    print(json.dumps(result))

if __name__ == "__main__":
    user_input = json.loads(sys.argv[1])
    predict_disaster_impact(user_input)
