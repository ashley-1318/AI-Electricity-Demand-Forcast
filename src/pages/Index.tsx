import React, { useState } from "react";
import PredictionForm from "@/components/PredictionForm";
import Dashboard from "@/components/Dashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, BarChart3, Upload, Info } from "lucide-react";

interface PredictionData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  date: string;
  hour: number;
  model: string;
}

const Index = () => {
  const [predictionData, setPredictionData] = useState<PredictionData | null>(null);
  const [forecastResults, setForecastResults] = useState<number[]>([]);

  const handlePrediction = (data: PredictionData, results: number[]) => {
    setPredictionData(data);
    setForecastResults(results);
  };

  return (
    <div className="min-h-screen bg-background grid-pattern">
      {/* Header */}
      <header className="border-b border-electric/20 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-electric-gradient rounded-lg flex items-center justify-center electric-pulse">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Tamil Nadu AI Electricity</h1>
                <p className="text-sm text-muted-foreground">Demand Forecasting System</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Powered by</p>
                <p className="font-semibold text-electric">Advanced AI Models</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="predict" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-card/50 border border-electric/20">
            <TabsTrigger 
              value="predict" 
              className="flex items-center gap-2 data-[state=active]:bg-electric-gradient data-[state=active]:text-primary-foreground"
            >
              <Zap className="w-4 h-4" />
              Predict
            </TabsTrigger>
            <TabsTrigger 
              value="dashboard"
              className="flex items-center gap-2 data-[state=active]:bg-electric-gradient data-[state=active]:text-primary-foreground"
            >
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="about"
              className="flex items-center gap-2 data-[state=active]:bg-electric-gradient data-[state=active]:text-primary-foreground"
            >
              <Info className="w-4 h-4" />
              About
            </TabsTrigger>
          </TabsList>

          <TabsContent value="predict" className="space-y-8">
            <div className="max-w-2xl mx-auto">
              <PredictionForm onPrediction={handlePrediction} />
            </div>
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-8">
            <Dashboard predictionData={predictionData} forecastResults={forecastResults} />
          </TabsContent>

          <TabsContent value="about" className="space-y-8">
            <div className="max-w-4xl mx-auto space-y-6">
              <Card className="energy-card">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold gradient-text mb-6 text-center">
                    Tamil Nadu AI Electricity Demand Forecasting
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-6 bg-muted/10 rounded-lg border border-electric/20">
                      <div className="w-12 h-12 bg-electric-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                        <Zap className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold text-electric mb-2">Ridge Regression</h3>
                      <p className="text-sm text-muted-foreground">
                        Linear model with regularization for stable predictions and feature importance analysis.
                      </p>
                    </div>

                    <div className="text-center p-6 bg-muted/10 rounded-lg border border-electric/20">
                      <div className="w-12 h-12 bg-electric-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                        <BarChart3 className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold text-electric mb-2">Random Forest</h3>
                      <p className="text-sm text-muted-foreground">
                        Ensemble method combining multiple decision trees for robust demand predictions.
                      </p>
                    </div>

                    <div className="text-center p-6 bg-muted/10 rounded-lg border border-electric/20">
                      <div className="w-12 h-12 bg-electric-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                        <Upload className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold text-electric mb-2">LSTM Hybrid</h3>
                      <p className="text-sm text-muted-foreground">
                        Deep learning model capturing temporal patterns and sequential dependencies.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-electric mb-3">System Features</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <li className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-2 h-2 bg-electric rounded-full" />
                          Real-time weather integration
                        </li>
                        <li className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-2 h-2 bg-electric rounded-full" />
                          24-hour demand forecasting
                        </li>
                        <li className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-2 h-2 bg-electric rounded-full" />
                          Multiple AI model comparison
                        </li>
                        <li className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-2 h-2 bg-electric rounded-full" />
                          Batch prediction capabilities
                        </li>
                        <li className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-2 h-2 bg-electric rounded-full" />
                          Interactive dashboard analytics
                        </li>
                        <li className="flex items-center gap-2 text-muted-foreground">
                          <div className="w-2 h-2 bg-electric rounded-full" />
                          Peak hour identification
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-electric mb-3">Input Parameters</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-muted/10 rounded-lg border border-electric/10">
                          <h4 className="font-semibold text-accent mb-2">Weather Data</h4>
                          <p className="text-sm text-muted-foreground">
                            Temperature, humidity, rainfall, and wind speed measurements affecting energy consumption patterns.
                          </p>
                        </div>
                        <div className="p-4 bg-muted/10 rounded-lg border border-electric/10">
                          <h4 className="font-semibold text-accent mb-2">Temporal Features</h4>
                          <p className="text-sm text-muted-foreground">
                            Date, hour, seasonal patterns, holidays, and weekend effects on electricity demand.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
                      <h4 className="font-semibold text-electric mb-2">Model Performance</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Our AI models achieve high accuracy with advanced feature engineering:
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Lag features (24h, 168h) for temporal dependencies</li>
                        <li>• Weather interaction terms (temperature × humidity)</li>
                        <li>• Seasonal flags and holiday detection</li>
                        <li>• Sin/cos transforms for cyclical patterns</li>
                        <li>• Standardized scaling for optimal performance</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-electric/20 bg-card/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-muted-foreground">
            <p className="text-sm">
              © 2024 Tamil Nadu AI Electricity Demand Forecasting System
            </p>
            <p className="text-xs mt-1">
              Powered by Advanced Machine Learning & React Technology
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;