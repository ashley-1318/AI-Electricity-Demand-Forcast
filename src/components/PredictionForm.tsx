import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, Upload, Calendar, Clock, Thermometer, Droplets, Wind, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PredictionData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  date: string;
  hour: number;
  model: string;
}

interface PredictionFormProps {
  onPrediction: (data: PredictionData, results: number[]) => void;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ onPrediction }) => {
  const [formData, setFormData] = useState<PredictionData>({
    temperature: 28,
    humidity: 75,
    rainfall: 0,
    windSpeed: 12,
    date: new Date().toISOString().split('T')[0],
    hour: new Date().getHours(),
    model: 'lstm'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const { toast } = useToast();

  // Mock prediction function - in real app this would call your Flask API
  const generateMockPrediction = (data: PredictionData): number[] => {
    const baseLoad = 850 + Math.sin(data.hour * Math.PI / 12) * 200; // Base daily pattern
    const tempEffect = (data.temperature - 25) * 15; // Temperature impact
    const humidityEffect = (data.humidity - 50) * 2; // Humidity impact
    
    // Generate 24-hour forecast with some variation
    return Array.from({ length: 24 }, (_, i) => {
      const hourOffset = (data.hour + i) % 24;
      const dailyPattern = 850 + Math.sin(hourOffset * Math.PI / 12) * 200;
      const noise = (Math.random() - 0.5) * 50;
      const modelVariation = data.model === 'ridge' ? 0.95 : data.model === 'rf' ? 1.05 : 1.02;
      
      return Math.max(400, Math.round((dailyPattern + tempEffect + humidityEffect + noise) * modelVariation));
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const results = generateMockPrediction(formData);
      onPrediction(formData, results);
      
      toast({
        title: "Prediction Complete",
        description: `Generated 24-hour forecast using ${formData.model.toUpperCase()} model`,
      });
    } catch (error) {
      toast({
        title: "Prediction Failed", 
        description: "There was an error generating the forecast",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
      toast({
        title: "CSV Uploaded",
        description: `Ready to process ${file.name} for batch predictions`,
      });
    } else {
      toast({
        title: "Invalid File",
        description: "Please upload a CSV file",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="energy-card">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-electric rounded-full flex items-center justify-center mb-4 electric-pulse">
          <Zap className="w-8 h-8 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl gradient-text">AI Demand Forecasting</CardTitle>
        <CardDescription>
          Enter weather conditions and system parameters to predict electricity demand
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Weather Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="temperature" className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-electric" />
                Temperature (°C)
              </Label>
              <Input
                id="temperature"
                type="number"
                value={formData.temperature}
                onChange={(e) => setFormData(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                min="0"
                max="50"
                step="0.1"
                required
                className="bg-input/50 border-electric/20 focus:border-electric"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="humidity" className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-electric" />
                Humidity (%)
              </Label>
              <Input
                id="humidity"
                type="number"
                value={formData.humidity}
                onChange={(e) => setFormData(prev => ({ ...prev, humidity: parseFloat(e.target.value) }))}
                min="0"
                max="100"
                step="1"
                required
                className="bg-input/50 border-electric/20 focus:border-electric"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rainfall">Rainfall (mm)</Label>
              <Input
                id="rainfall"
                type="number"
                value={formData.rainfall}
                onChange={(e) => setFormData(prev => ({ ...prev, rainfall: parseFloat(e.target.value) }))}
                min="0"
                step="0.1"
                required
                className="bg-input/50 border-electric/20 focus:border-electric"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="windSpeed" className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-electric" />
                Wind Speed (km/h)
              </Label>
              <Input
                id="windSpeed"
                type="number"
                value={formData.windSpeed}
                onChange={(e) => setFormData(prev => ({ ...prev, windSpeed: parseFloat(e.target.value) }))}
                min="0"
                step="0.1"
                required
                className="bg-input/50 border-electric/20 focus:border-electric"
              />
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-electric" />
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                required
                className="bg-input/50 border-electric/20 focus:border-electric"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hour" className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-electric" />
                Hour
              </Label>
              <Select value={formData.hour.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, hour: parseInt(value) }))}>
                <SelectTrigger className="bg-input/50 border-electric/20 focus:border-electric">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {i.toString().padStart(2, '0')}:00
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Model Selection */}
          <div className="space-y-2">
            <Label htmlFor="model">AI Model</Label>
            <Select value={formData.model} onValueChange={(value) => setFormData(prev => ({ ...prev, model: value }))}>
              <SelectTrigger className="bg-input/50 border-electric/20 focus:border-electric">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ridge">Ridge Regression</SelectItem>
                <SelectItem value="rf">Random Forest</SelectItem>
                <SelectItem value="lstm">LSTM Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="csv" className="flex items-center gap-2">
              <Upload className="w-4 h-4 text-electric" />
              Batch Upload (CSV)
            </Label>
            <Input
              id="csv"
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="bg-input/50 border-electric/20 focus:border-electric file:bg-electric-gradient file:text-primary-foreground"
            />
            {csvFile && (
              <p className="text-sm text-muted-foreground">
                Selected: {csvFile.name}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-electric-gradient hover:opacity-90 text-primary-foreground font-semibold py-6 text-lg"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2" />
                Generating Forecast...
              </>
            ) : (
              <>
                <Eye className="w-5 h-5 mr-2" />
                Generate Forecast
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PredictionForm;