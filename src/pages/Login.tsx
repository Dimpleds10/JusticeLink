import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Users, Building2, Globe, Settings, FileCheck } from 'lucide-react';
import type { UserRole } from '@/types';

const roles: { id: UserRole; label: string; icon: any; description: string; color: string }[] = [
  { 
    id: 'victim', 
    label: 'Victim / Applicant', 
    icon: Shield, 
    description: 'Apply for relief and track your case',
    color: 'primary'
  },
  { 
    id: 'ngo', 
    label: 'NGO / Civil Society', 
    icon: Users, 
    description: 'Register and support victims',
    color: 'secondary'
  },
  { 
    id: 'state-official', 
    label: 'State Official', 
    icon: Building2, 
    description: 'Verify cases and sanction relief',
    color: 'accent'
  },
  { 
    id: 'central', 
    label: 'Central Ministry (MSJE)', 
    icon: Globe, 
    description: 'National oversight and policy',
    color: 'info'
  },
  { 
    id: 'admin', 
    label: 'System Admin', 
    icon: Settings, 
    description: 'Manage roles and system settings',
    color: 'warning'
  },
  { 
    id: 'auditor', 
    label: 'Auditor', 
    icon: FileCheck, 
    description: 'Review compliance and audit logs',
    color: 'success'
  },
];

const Login = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const handleRoleSelect = (role: UserRole) => {
    localStorage.setItem('justicelink-role', role);
    localStorage.setItem('justicelink-language', language);
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Shield className="w-10 h-10 text-primary-foreground" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-foreground">JusticeLink India</h1>
              <p className="text-muted-foreground text-sm">Integrated PCR/PoA DBT Ecosystem</p>
            </div>
          </div>
          <p className="text-lg text-foreground/80 font-medium">
            {language === 'en' ? 'Empowering Dignity, Delivering Justice — Digitally' : 'सम्मान को सशक्त बनाना, न्याय प्रदान करना — डिजिटल रूप से'}
          </p>
          <div className="mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            >
              {language === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}
            </Button>
          </div>
        </div>

        {/* Role Selection */}
        <Card className="shadow-elevated border-2">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {language === 'en' ? 'Select Your Role' : 'अपनी भूमिका चुनें'}
            </CardTitle>
            <CardDescription className="text-center">
              {language === 'en' 
                ? 'Choose your role to access the appropriate portal' 
                : 'उपयुक्त पोर्टल तक पहुंचने के लिए अपनी भूमिका चुनें'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <Button
                    key={role.id}
                    variant="outline"
                    className="h-auto p-6 flex flex-col items-center gap-3 hover:border-primary hover:bg-primary/5 transition-all"
                    onClick={() => handleRoleSelect(role.id)}
                  >
                    <div className={`w-12 h-12 rounded-full bg-${role.color}/10 flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 text-${role.color}`} />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-foreground">{role.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">{role.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>© Ministry of Social Justice and Empowerment, Government of India – 2025</p>
          <p className="mt-2">Powered by National Informatics Centre (NIC)</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
