import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { useState } from 'react';
import { Calculator, Droplets, Activity, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Tools = () => {
  // BMI Calculator State
  const [bmiWeight, setBmiWeight] = useState('');
  const [bmiHeight, setBmiHeight] = useState('');
  const [bmiResult, setBmiResult] = useState<{ value: number; category: string; color: string } | null>(null);

  // Calorie Calculator State
  const [calAge, setCalAge] = useState('');
  const [calGender, setCalGender] = useState('male');
  const [calWeight, setCalWeight] = useState('');
  const [calHeight, setCalHeight] = useState('');
  const [calActivity, setCalActivity] = useState('moderate');
  const [calorieResult, setCalorieResult] = useState<number | null>(null);

  // Body Fat Calculator State
  const [bfGender, setBfGender] = useState('male');
  const [bfWaist, setBfWaist] = useState('');
  const [bfNeck, setBfNeck] = useState('');
  const [bfHeight, setBfHeight] = useState('');
  const [bfHip, setBfHip] = useState('');
  const [bodyFatResult, setBodyFatResult] = useState<number | null>(null);

  // Water Intake Calculator State
  const [waterWeight, setWaterWeight] = useState('');
  const [waterActivity, setWaterActivity] = useState('moderate');
  const [waterResult, setWaterResult] = useState<number | null>(null);

  const calculateBMI = () => {
    const weight = parseFloat(bmiWeight);
    const height = parseFloat(bmiHeight) / 100;
    if (weight > 0 && height > 0) {
      const bmi = weight / (height * height);
      let category = '';
      let color = '';
      if (bmi < 18.5) {
        category = 'Underweight';
        color = 'text-blue-500';
      } else if (bmi < 25) {
        category = 'Normal weight';
        color = 'text-primary';
      } else if (bmi < 30) {
        category = 'Overweight';
        color = 'text-yellow-500';
      } else {
        category = 'Obese';
        color = 'text-red-500';
      }
      setBmiResult({ value: Math.round(bmi * 10) / 10, category, color });
    }
  };

  const calculateCalories = () => {
    const age = parseFloat(calAge);
    const weight = parseFloat(calWeight);
    const height = parseFloat(calHeight);
    
    if (age > 0 && weight > 0 && height > 0) {
      let bmr = calGender === 'male'
        ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
        : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      
      const activityMultipliers: Record<string, number> = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9
      };
      
      setCalorieResult(Math.round(bmr * activityMultipliers[calActivity]));
    }
  };

  const calculateBodyFat = () => {
    const waist = parseFloat(bfWaist);
    const neck = parseFloat(bfNeck);
    const height = parseFloat(bfHeight);
    const hip = parseFloat(bfHip);

    if (waist > 0 && neck > 0 && height > 0) {
      let bf: number;
      if (bfGender === 'male') {
        bf = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
      } else {
        if (hip > 0) {
          bf = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
        } else {
          return;
        }
      }
      setBodyFatResult(Math.round(bf * 10) / 10);
    }
  };

  const calculateWater = () => {
    const weight = parseFloat(waterWeight);
    if (weight > 0) {
      const baseWater = weight * 0.033;
      const activityMultipliers: Record<string, number> = {
        sedentary: 1,
        moderate: 1.2,
        active: 1.4
      };
      setWaterResult(Math.round(baseWater * activityMultipliers[waterActivity] * 10) / 10);
    }
  };

  return (
    <>
      <Helmet>
        <title>Health Calculators & Tools | Healthy Life Hub</title>
        <meta name="description" content="Free health calculators including BMI calculator, calorie calculator, body fat calculator, and water intake calculator. Track your health journey with our easy-to-use tools." />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Health <span className="text-primary">Calculators</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Use our free health tools to track your fitness journey and make informed decisions about your health.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="bmi" className="max-w-4xl mx-auto">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-8">
                <TabsTrigger value="bmi" className="flex items-center gap-2">
                  <Scale className="w-4 h-4" />
                  <span className="hidden sm:inline">BMI</span>
                </TabsTrigger>
                <TabsTrigger value="calories" className="flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  <span className="hidden sm:inline">Calories</span>
                </TabsTrigger>
                <TabsTrigger value="bodyfat" className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <span className="hidden sm:inline">Body Fat</span>
                </TabsTrigger>
                <TabsTrigger value="water" className="flex items-center gap-2">
                  <Droplets className="w-4 h-4" />
                  <span className="hidden sm:inline">Water</span>
                </TabsTrigger>
              </TabsList>

              {/* BMI Calculator */}
              <TabsContent value="bmi">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Scale className="w-5 h-5 text-primary" />
                      BMI Calculator
                    </CardTitle>
                    <CardDescription>
                      Calculate your Body Mass Index to understand if you're at a healthy weight.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bmi-weight">Weight (kg)</Label>
                        <Input
                          id="bmi-weight"
                          type="number"
                          placeholder="70"
                          value={bmiWeight}
                          onChange={(e) => setBmiWeight(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bmi-height">Height (cm)</Label>
                        <Input
                          id="bmi-height"
                          type="number"
                          placeholder="175"
                          value={bmiHeight}
                          onChange={(e) => setBmiHeight(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button onClick={calculateBMI} className="w-full">Calculate BMI</Button>
                    {bmiResult && (
                      <div className="text-center p-6 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">Your BMI</p>
                        <p className={`text-4xl font-bold ${bmiResult.color}`}>{bmiResult.value}</p>
                        <p className={`text-lg font-medium ${bmiResult.color}`}>{bmiResult.category}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Calorie Calculator */}
              <TabsContent value="calories">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-primary" />
                      Daily Calorie Calculator
                    </CardTitle>
                    <CardDescription>
                      Calculate how many calories you need per day based on your activity level.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cal-age">Age</Label>
                        <Input
                          id="cal-age"
                          type="number"
                          placeholder="25"
                          value={calAge}
                          onChange={(e) => setCalAge(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cal-gender">Gender</Label>
                        <Select value={calGender} onValueChange={setCalGender}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cal-weight">Weight (kg)</Label>
                        <Input
                          id="cal-weight"
                          type="number"
                          placeholder="70"
                          value={calWeight}
                          onChange={(e) => setCalWeight(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cal-height">Height (cm)</Label>
                        <Input
                          id="cal-height"
                          type="number"
                          placeholder="175"
                          value={calHeight}
                          onChange={(e) => setCalHeight(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cal-activity">Activity Level</Label>
                      <Select value={calActivity} onValueChange={setCalActivity}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                          <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                          <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                          <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                          <SelectItem value="veryActive">Very Active (hard exercise daily)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={calculateCalories} className="w-full">Calculate Calories</Button>
                    {calorieResult && (
                      <div className="text-center p-6 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">Daily Calorie Needs</p>
                        <p className="text-4xl font-bold text-primary">{calorieResult}</p>
                        <p className="text-lg text-muted-foreground">calories/day</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Body Fat Calculator */}
              <TabsContent value="bodyfat">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      Body Fat Calculator
                    </CardTitle>
                    <CardDescription>
                      Estimate your body fat percentage using the U.S. Navy method.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bf-gender">Gender</Label>
                        <Select value={bfGender} onValueChange={setBfGender}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bf-height">Height (cm)</Label>
                        <Input
                          id="bf-height"
                          type="number"
                          placeholder="175"
                          value={bfHeight}
                          onChange={(e) => setBfHeight(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bf-waist">Waist (cm)</Label>
                        <Input
                          id="bf-waist"
                          type="number"
                          placeholder="80"
                          value={bfWaist}
                          onChange={(e) => setBfWaist(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bf-neck">Neck (cm)</Label>
                        <Input
                          id="bf-neck"
                          type="number"
                          placeholder="38"
                          value={bfNeck}
                          onChange={(e) => setBfNeck(e.target.value)}
                        />
                      </div>
                      {bfGender === 'female' && (
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="bf-hip">Hip (cm)</Label>
                          <Input
                            id="bf-hip"
                            type="number"
                            placeholder="95"
                            value={bfHip}
                            onChange={(e) => setBfHip(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                    <Button onClick={calculateBodyFat} className="w-full">Calculate Body Fat</Button>
                    {bodyFatResult && (
                      <div className="text-center p-6 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">Body Fat Percentage</p>
                        <p className="text-4xl font-bold text-primary">{bodyFatResult}%</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Water Intake Calculator */}
              <TabsContent value="water">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Droplets className="w-5 h-5 text-primary" />
                      Water Intake Calculator
                    </CardTitle>
                    <CardDescription>
                      Find out how much water you should drink daily for optimal health.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="water-weight">Weight (kg)</Label>
                        <Input
                          id="water-weight"
                          type="number"
                          placeholder="70"
                          value={waterWeight}
                          onChange={(e) => setWaterWeight(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="water-activity">Activity Level</Label>
                        <Select value={waterActivity} onValueChange={setWaterActivity}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sedentary">Sedentary</SelectItem>
                            <SelectItem value="moderate">Moderate Exercise</SelectItem>
                            <SelectItem value="active">Active/Athlete</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button onClick={calculateWater} className="w-full">Calculate Water Intake</Button>
                    {waterResult && (
                      <div className="text-center p-6 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">Daily Water Intake</p>
                        <p className="text-4xl font-bold text-primary">{waterResult}L</p>
                        <p className="text-lg text-muted-foreground">({Math.round(waterResult * 4)} glasses)</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Tools;
