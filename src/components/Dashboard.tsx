import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Activity, Zap, TrendingUp, Clock, Thermometer, Droplets } from "lucide-react";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PredictionData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  date: string;
  hour: number;
  model: string;
}

interface DashboardProps {
  predictionData: PredictionData | null;
  forecastResults: number[];
}

const Dashboard: React.FC<DashboardProps> = ({ predictionData, forecastResults }) => {
  if (!predictionData || forecastResults.length === 0) {
    return (
      <div className="grid grid-pattern min-h-96 rounded-lg border border-electric/20 bg-card/50 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-lg text-muted-foreground">Run a prediction to see dashboard</p>
        </div>
      </div>
    );
  }

  // Generate hours for chart labels
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = (predictionData.hour + i) % 24;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  // Chart configuration for demand forecast
  const demandChartData = {
    labels: hours,
    datasets: [
      {
        label: 'Predicted Demand (MW)',
        data: forecastResults,
        borderColor: 'rgb(0, 102, 255)',
        backgroundColor: 'rgba(0, 102, 255, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(0, 204, 255)',
        pointBorderColor: 'rgb(0, 102, 255)',
        pointRadius: 6,
        pointHoverRadius: 8,
      }
    ]
  };

  const demandChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgb(210, 215, 238)',
          font: { size: 14, weight: 'bold' as const }
        }
      },
      title: {
        display: true,
        text: '24-Hour Electricity Demand Forecast',
        color: 'rgb(0, 204, 255)',
        font: { size: 18, weight: 'bold' as const }
      },
      tooltip: {
        backgroundColor: 'rgba(33, 39, 55, 0.95)',
        titleColor: 'rgb(0, 204, 255)',
        bodyColor: 'rgb(210, 215, 238)',
        borderColor: 'rgb(0, 102, 255)',
        borderWidth: 1,
        callbacks: {
          label: (context: any) => `${context.label}: ${context.parsed.y} MW`
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(0, 102, 255, 0.1)' },
        ticks: { color: 'rgb(210, 215, 238)' },
        title: {
          display: true,
          text: 'Time (24-hour format)',
          color: 'rgb(210, 215, 238)',
          font: { size: 12, weight: 'bold' as const }
        }
      },
      y: {
        grid: { color: 'rgba(0, 102, 255, 0.1)' },
        ticks: { color: 'rgb(210, 215, 238)' },
        title: {
          display: true,
          text: 'Demand (MW)',
          color: 'rgb(210, 215, 238)',
          font: { size: 12, weight: 'bold' as const }
        }
      }
    }
  };

  // Peak hours analysis
  const peakHours = forecastResults
    .map((value, index) => ({ hour: hours[index], value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  const peakChartData = {
    labels: peakHours.map(p => p.hour),
    datasets: [
      {
        label: 'Peak Demand (MW)',
        data: peakHours.map(p => p.value),
        backgroundColor: 'rgba(0, 204, 255, 0.8)',
        borderColor: 'rgb(0, 102, 255)',
        borderWidth: 2,
        borderRadius: 8,
      }
    ]
  };

  const peakChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgb(210, 215, 238)',
          font: { size: 14, weight: 'bold' as const }
        }
      },
      title: {
        display: true,
        text: 'Top 6 Peak Hours',
        color: 'rgb(0, 204, 255)',
        font: { size: 16, weight: 'bold' as const }
      },
      tooltip: {
        backgroundColor: 'rgba(33, 39, 55, 0.95)',
        titleColor: 'rgb(0, 204, 255)',
        bodyColor: 'rgb(210, 215, 238)',
        borderColor: 'rgb(0, 102, 255)',
        borderWidth: 1,
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(0, 102, 255, 0.1)' },
        ticks: { color: 'rgb(210, 215, 238)' }
      },
      y: {
        grid: { color: 'rgba(0, 102, 255, 0.1)' },
        ticks: { color: 'rgb(210, 215, 238)' }
      }
    }
  };

  // Calculate metrics
  const avgDemand = Math.round(forecastResults.reduce((a, b) => a + b, 0) / forecastResults.length);
  const maxDemand = Math.max(...forecastResults);
  const minDemand = Math.min(...forecastResults);
  const totalConsumption = Math.round(forecastResults.reduce((a, b) => a + b, 0));

  // Mock MAPE and RMSE (in real app these would come from your Flask API)
  const mockMAPE = (5 + Math.random() * 3).toFixed(2);
  const mockRMSE = (25 + Math.random() * 10).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-2">Forecast Dashboard</h2>
        <p className="text-muted-foreground">
          Generated using <span className="text-electric font-semibold">{predictionData.model.toUpperCase()}</span> model
          for {new Date(predictionData.date).toLocaleDateString()} starting at {predictionData.hour.toString().padStart(2, '0')}:00
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="energy-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Demand</p>
                <p className="text-2xl font-bold text-electric">{avgDemand} MW</p>
              </div>
              <Activity className="w-8 h-8 text-electric" />
            </div>
          </CardContent>
        </Card>

        <Card className="energy-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Peak Demand</p>
                <p className="text-2xl font-bold text-accent">{maxDemand} MW</p>
              </div>
              <TrendingUp className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="energy-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">MAPE</p>
                <p className="text-2xl font-bold text-green-400">{mockMAPE}%</p>
              </div>
              <Zap className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="energy-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">RMSE</p>
                <p className="text-2xl font-bold text-yellow-400">{mockRMSE} MW</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weather Conditions */}
      <Card className="energy-card">
        <CardHeader>
          <CardTitle className="text-electric">Weather Conditions</CardTitle>
          <CardDescription>Current input parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <Thermometer className="w-5 h-5 text-electric" />
              <div>
                <p className="text-sm text-muted-foreground">Temperature</p>
                <p className="font-semibold">{predictionData.temperature}°C</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Droplets className="w-5 h-5 text-electric" />
              <div>
                <p className="text-sm text-muted-foreground">Humidity</p>
                <p className="font-semibold">{predictionData.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-electric rounded-full opacity-70" />
              <div>
                <p className="text-sm text-muted-foreground">Rainfall</p>
                <p className="font-semibold">{predictionData.rainfall} mm</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-accent rounded-full opacity-70" />
              <div>
                <p className="text-sm text-muted-foreground">Wind Speed</p>
                <p className="font-semibold">{predictionData.windSpeed} km/h</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="energy-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-electric">Demand Forecast</CardTitle>
            <CardDescription>24-hour electricity demand prediction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Line data={demandChartData} options={demandChartOptions} />
            </div>
          </CardContent>
        </Card>

        <Card className="energy-card">
          <CardHeader>
            <CardTitle className="text-electric">Peak Hours</CardTitle>
            <CardDescription>Highest demand periods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Bar data={peakChartData} options={peakChartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary */}
      <Card className="energy-card">
        <CardHeader>
          <CardTitle className="text-electric">Forecast Summary</CardTitle>
          <CardDescription>Key insights from the prediction</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-muted/20 rounded-lg border border-electric/20">
              <p className="text-sm text-muted-foreground">Daily Consumption</p>
              <p className="text-xl font-bold text-electric">{totalConsumption} MWh</p>
            </div>
            <div className="p-4 bg-muted/20 rounded-lg border border-electric/20">
              <p className="text-sm text-muted-foreground">Demand Range</p>
              <p className="text-xl font-bold text-accent">{minDemand} - {maxDemand} MW</p>
            </div>
            <div className="p-4 bg-muted/20 rounded-lg border border-electric/20">
              <p className="text-sm text-muted-foreground">Model Accuracy</p>
              <p className="text-xl font-bold text-green-400">{mockMAPE}% MAPE</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <h4 className="font-semibold text-electric mb-2">AI Insights</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Peak demand expected around {peakHours[0]?.hour} with {peakHours[0]?.value} MW</li>
              <li>• Weather conditions suggest {predictionData.temperature > 30 ? 'higher cooling' : 'moderate'} energy consumption</li>
              <li>• {predictionData.model.toUpperCase()} model confidence: {(100 - parseFloat(mockMAPE)).toFixed(1)}%</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;