# ⚡ AI-Based Electricity Demand and Peak Load Forecasting for Tamil Nadu Power System  

🔗 [**View Demo Site**](https://ai-electricity-forecast.web.app)  

---

## 📌 Project Summary  
This project develops an **Artificial Intelligence (AI) based forecasting model** to predict electricity demand and peak load for Tamil Nadu’s power system.  

The model integrates **historical load, weather data, calendar effects, and regional growth indicators** to capture unique demand patterns, including strong evening peaks and renewable energy variability.  

Machine learning techniques such as **LSTM (Long Short-Term Memory), SVM (Support Vector Machines), and Fuzzy Neural Networks (FNN)** are used to generate accurate **short-term and long-term hourly projections**, helping optimize:  
- ⚡ Power procurement  
- 🛠️ Grid stability  
- 🌱 Renewable integration  

---

## 🚀 Features  
- Hourly electricity demand & peak load forecasting  
- Weather variable integration: temperature, humidity, wind speed, rainfall  
- Calendar effects: holidays, weekends, seasonal variations  
- Regional socioeconomic indicators (e.g., real estate trends)  
- Multi-model AI ensemble approach for higher accuracy  
- Interactive web dashboard for real-time visualization  

---

## 🎯 Motivation  
Tamil Nadu is facing:  
- Rapid electricity demand growth  
- High renewable energy penetration  
- Complex load patterns due to climate & socio-economic factors  

Accurate **AI-driven forecasting** is crucial to:  
- Ensure reliable power supply  
- Minimize costly imbalances  
- Enable efficient clean energy integration  

---

## 📊 Data Sources  
- Historical electricity load data from Tamil Nadu utilities  
- Meteorological data (temperature, humidity, wind, rainfall)  
- Regional development statistics & public holiday calendars  

---

## ⚙️ Methodology  
1. **Data Preprocessing** – cleaning, normalization & feature engineering  
2. **Model Training** – LSTM, SVM, FNN with hyperparameter tuning  
3. **Evaluation & Ensemble** – combining models for robustness  
4. **Deployment** – web platform hosting live forecasts  

---

## 💻 Usage  

```bash
# Clone the repository
git clone https://github.com/your-username/ai-electricity-forecast.git
cd ai-electricity-forecast

# Install dependencies
pip install -r requirements.txt

# Prepare dataset
python src/preprocess.py

# Train models
python src/train.py

# Run inference
python src/inference.py
