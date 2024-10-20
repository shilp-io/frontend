import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Moon, Globe } from "lucide-react";
import { useTheme } from '@/context/ThemeContext';

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'en',
  });

  useEffect(() => {
    setSettings(prev => ({
      ...prev,
      darkMode: theme === 'dark',
    }));
  }, [theme]);

  const handleSwitchChange = (name: string) => (checked: boolean) => {
    if (name === 'darkMode') {
      toggleTheme();
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: checked,
      }));
    }
  };

  const handleLanguageChange = (value: string) => {
    setSettings(prev => ({
      ...prev,
      language: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Settings saved:', settings);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Settings</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Manage your application preferences and settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">

              {/* Dark Mode Setting */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Moon className="h-5 w-5 text-gray-500" />
                  <div className="space-y-1">
                    <Label htmlFor="darkMode">Dark Mode</Label>
                    <p className="text-sm text-gray-500">Toggle dark mode for the interface.</p>
                  </div>
                </div>
                <Switch
                  id="darkMode"
                  checked={settings.darkMode}
                  onCheckedChange={handleSwitchChange('darkMode')}
                />
              </div>

              {/* Language Setting */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Globe className="h-5 w-5 text-gray-500" />
                  <div className="space-y-1">
                    <Label>Language</Label>
                    <p className="text-sm text-gray-500">Select your preferred language.</p>
                  </div>
                </div>
                <Select value={settings.language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" className="w-32">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
