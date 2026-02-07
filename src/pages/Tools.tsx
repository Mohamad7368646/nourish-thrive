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
import { useLanguage } from '@/i18n/LanguageContext';

const Tools = () => {
  const { t } = useLanguage();

  const [bmiWeight, setBmiWeight] = useState('');
  const [bmiHeight, setBmiHeight] = useState('');
  const [bmiResult, setBmiResult] = useState<{ value: number; category: string; color: string } | null>(null);

  const [calAge, setCalAge] = useState('');
  const [calGender, setCalGender] = useState('male');
  const [calWeight, setCalWeight] = useState('');
  const [calHeight, setCalHeight] = useState('');
  const [calActivity, setCalActivity] = useState('moderate');
  const [calorieResult, setCalorieResult] = useState<number | null>(null);

  const [bfGender, setBfGender] = useState('male');
  const [bfWaist, setBfWaist] = useState('');
  const [bfNeck, setBfNeck] = useState('');
  const [bfHeight, setBfHeight] = useState('');
  const [bfHip, setBfHip] = useState('');
  const [bodyFatResult, setBodyFatResult] = useState<number | null>(null);

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
      if (bmi < 18.5) { category = t.toolsPage.underweight; color = 'text-blue-500'; }
      else if (bmi < 25) { category = t.toolsPage.normalWeight; color = 'text-primary'; }
      else if (bmi < 30) { category = t.toolsPage.overweight; color = 'text-yellow-500'; }
      else { category = t.toolsPage.obese; color = 'text-red-500'; }
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
      const multipliers: Record<string, number> = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, veryActive: 1.9 };
      setCalorieResult(Math.round(bmr * multipliers[calActivity]));
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
        } else return;
      }
      setBodyFatResult(Math.round(bf * 10) / 10);
    }
  };

  const calculateWater = () => {
    const weight = parseFloat(waterWeight);
    if (weight > 0) {
      const baseWater = weight * 0.033;
      const multipliers: Record<string, number> = { sedentary: 1, moderate: 1.2, active: 1.4 };
      setWaterResult(Math.round(baseWater * multipliers[waterActivity] * 10) / 10);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t.toolsPage.title} {t.toolsPage.titleHighlight} | Healthy Life Hub</title>
        <meta name="description" content={t.toolsPage.subtitle} />
      </Helmet>
      <Layout>
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.toolsPage.title} <span className="text-primary">{t.toolsPage.titleHighlight}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.toolsPage.subtitle}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="bmi" className="max-w-4xl mx-auto">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-8">
                <TabsTrigger value="bmi" className="flex items-center gap-2"><Scale className="w-4 h-4" /><span className="hidden sm:inline">BMI</span></TabsTrigger>
                <TabsTrigger value="calories" className="flex items-center gap-2"><Calculator className="w-4 h-4" /><span className="hidden sm:inline">{t.common.cal}</span></TabsTrigger>
                <TabsTrigger value="bodyfat" className="flex items-center gap-2"><Activity className="w-4 h-4" /><span className="hidden sm:inline">{t.common.fat}</span></TabsTrigger>
                <TabsTrigger value="water" className="flex items-center gap-2"><Droplets className="w-4 h-4" /><span className="hidden sm:inline">💧</span></TabsTrigger>
              </TabsList>

              <TabsContent value="bmi">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Scale className="w-5 h-5 text-primary" />{t.toolsPage.bmiTitle}</CardTitle>
                    <CardDescription>{t.toolsPage.bmiDesc}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2"><Label>{t.toolsPage.weight}</Label><Input type="number" placeholder="70" value={bmiWeight} onChange={(e) => setBmiWeight(e.target.value)} /></div>
                      <div className="space-y-2"><Label>{t.toolsPage.height}</Label><Input type="number" placeholder="175" value={bmiHeight} onChange={(e) => setBmiHeight(e.target.value)} /></div>
                    </div>
                    <Button onClick={calculateBMI} className="w-full">{t.toolsPage.calculateBMI}</Button>
                    {bmiResult && (
                      <div className="text-center p-6 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">{t.toolsPage.yourBMI}</p>
                        <p className={`text-4xl font-bold ${bmiResult.color}`}>{bmiResult.value}</p>
                        <p className={`text-lg font-medium ${bmiResult.color}`}>{bmiResult.category}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="calories">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Calculator className="w-5 h-5 text-primary" />{t.toolsPage.calorieTitle}</CardTitle>
                    <CardDescription>{t.toolsPage.calorieDesc}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2"><Label>{t.toolsPage.age}</Label><Input type="number" placeholder="25" value={calAge} onChange={(e) => setCalAge(e.target.value)} /></div>
                      <div className="space-y-2">
                        <Label>{t.toolsPage.gender}</Label>
                        <Select value={calGender} onValueChange={setCalGender}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">{t.toolsPage.male}</SelectItem>
                            <SelectItem value="female">{t.toolsPage.female}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2"><Label>{t.toolsPage.weight}</Label><Input type="number" placeholder="70" value={calWeight} onChange={(e) => setCalWeight(e.target.value)} /></div>
                      <div className="space-y-2"><Label>{t.toolsPage.height}</Label><Input type="number" placeholder="175" value={calHeight} onChange={(e) => setCalHeight(e.target.value)} /></div>
                    </div>
                    <div className="space-y-2">
                      <Label>{t.toolsPage.activityLevel}</Label>
                      <Select value={calActivity} onValueChange={setCalActivity}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedentary">{t.toolsPage.sedentary}</SelectItem>
                          <SelectItem value="light">{t.toolsPage.lightActivity}</SelectItem>
                          <SelectItem value="moderate">{t.toolsPage.moderateActivity}</SelectItem>
                          <SelectItem value="active">{t.toolsPage.activeLevel}</SelectItem>
                          <SelectItem value="veryActive">{t.toolsPage.veryActive}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={calculateCalories} className="w-full">{t.toolsPage.calculateCalories}</Button>
                    {calorieResult && (
                      <div className="text-center p-6 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">{t.toolsPage.dailyCalorieNeeds}</p>
                        <p className="text-4xl font-bold text-primary">{calorieResult}</p>
                        <p className="text-lg text-muted-foreground">{t.toolsPage.caloriesPerDay}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bodyfat">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Activity className="w-5 h-5 text-primary" />{t.toolsPage.bodyFatTitle}</CardTitle>
                    <CardDescription>{t.toolsPage.bodyFatDesc}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>{t.toolsPage.gender}</Label>
                        <Select value={bfGender} onValueChange={setBfGender}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">{t.toolsPage.male}</SelectItem>
                            <SelectItem value="female">{t.toolsPage.female}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2"><Label>{t.toolsPage.height}</Label><Input type="number" placeholder="175" value={bfHeight} onChange={(e) => setBfHeight(e.target.value)} /></div>
                      <div className="space-y-2"><Label>{t.toolsPage.waist}</Label><Input type="number" placeholder="80" value={bfWaist} onChange={(e) => setBfWaist(e.target.value)} /></div>
                      <div className="space-y-2"><Label>{t.toolsPage.neck}</Label><Input type="number" placeholder="38" value={bfNeck} onChange={(e) => setBfNeck(e.target.value)} /></div>
                      {bfGender === 'female' && (
                        <div className="space-y-2 md:col-span-2"><Label>{t.toolsPage.hip}</Label><Input type="number" placeholder="95" value={bfHip} onChange={(e) => setBfHip(e.target.value)} /></div>
                      )}
                    </div>
                    <Button onClick={calculateBodyFat} className="w-full">{t.toolsPage.calculateBodyFat}</Button>
                    {bodyFatResult && (
                      <div className="text-center p-6 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">{t.toolsPage.bodyFatPercentage}</p>
                        <p className="text-4xl font-bold text-primary">{bodyFatResult}%</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="water">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Droplets className="w-5 h-5 text-primary" />{t.toolsPage.waterTitle}</CardTitle>
                    <CardDescription>{t.toolsPage.waterDesc}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2"><Label>{t.toolsPage.weight}</Label><Input type="number" placeholder="70" value={waterWeight} onChange={(e) => setWaterWeight(e.target.value)} /></div>
                      <div className="space-y-2">
                        <Label>{t.toolsPage.activityLevel}</Label>
                        <Select value={waterActivity} onValueChange={setWaterActivity}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sedentary">{t.toolsPage.sedentaryWater}</SelectItem>
                            <SelectItem value="moderate">{t.toolsPage.moderateWater}</SelectItem>
                            <SelectItem value="active">{t.toolsPage.activeWater}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button onClick={calculateWater} className="w-full">{t.toolsPage.calculateWater}</Button>
                    {waterResult && (
                      <div className="text-center p-6 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">{t.toolsPage.dailyWaterIntake}</p>
                        <p className="text-4xl font-bold text-primary">{waterResult}L</p>
                        <p className="text-lg text-muted-foreground">({Math.round(waterResult * 4)} {t.toolsPage.glasses})</p>
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
