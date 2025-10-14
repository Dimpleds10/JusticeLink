import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, Building2, Globe, CheckCircle2, ArrowRight, Target, Database, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroBanner from '@/assets/hero-banner.jpg';
import msjeEmblem from '@/assets/msje-emblem.png';
import digitalEmpowerment from '@/assets/digital-empowerment.jpg';
import reliefProcess from '@/assets/relief-process.jpg';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: 'Victim Empowerment',
      description: 'Direct relief application, document upload, and real-time case tracking with Justice Wallet'
    },
    {
      icon: Users,
      title: 'NGO Collaboration',
      description: 'Civil society organizations can register victims and track progress with reputation scoring'
    },
    {
      icon: Building2,
      title: 'State Official Portal',
      description: 'AI-assisted verification, maker-checker approval, and geo-analytics with heatmaps'
    },
    {
      icon: Globe,
      title: 'Central Oversight',
      description: 'National dashboard with state-wise metrics, SLA tracking, and policy insights'
    },
    {
      icon: Database,
      title: 'Direct Benefit Transfer',
      description: 'Seamless DBT integration with PFMS for transparent, direct fund disbursement'
    },
    {
      icon: Zap,
      title: 'Real-time Tracking',
      description: 'Live status updates, delay alerts, and comprehensive audit trails'
    }
  ];

  const stats = [
    { label: 'Total Beneficiaries', value: '2.5M+', color: 'text-primary' },
    { label: 'States Covered', value: '28', color: 'text-secondary' },
    { label: 'NGO Partners', value: '450+', color: 'text-accent' },
    { label: 'Avg. Disbursal Time', value: '15 Days', color: 'text-info' }
  ];

  const processSteps = [
    { step: '1', title: 'Victim Registration', description: 'Apply online with documents' },
    { step: '2', title: 'AI Verification', description: 'Automated validation with explainable AI' },
    { step: '3', title: 'Official Review', description: 'State official approval workflow' },
    { step: '4', title: 'DBT Disbursement', description: 'Direct bank transfer via PFMS' },
    { step: '5', title: 'Justice Wallet', description: 'Digital proof with QR code' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={msjeEmblem} alt="MSJE Emblem" className="w-12 h-12" />
            <div>
              <h1 className="text-xl font-bold text-foreground">JusticeLink India</h1>
              <p className="text-xs text-muted-foreground">Ministry of Social Justice and Empowerment</p>
            </div>
          </div>
          <Button onClick={() => navigate('/login')} size="lg">
            Portal Login <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBanner})` }}
        />
        <div className="container relative mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Empowering Dignity, Delivering Justice — Digitally
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Integrated PCR/PoA DBT Ecosystem for Transparent, Efficient Relief Distribution
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/login')} className="text-lg">
                Access Portal
              </Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-2 hover-scale">
                <CardContent className="pt-6">
                  <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h3 className="text-3xl font-bold text-foreground mb-6">
                A Revolutionary Digital Platform for Social Justice
              </h3>
              <p className="text-muted-foreground mb-4">
                JusticeLink India is a comprehensive digital ecosystem that transforms the delivery of relief and compensation under the Protection of Civil Rights (PCR) Act and Prevention of Atrocities (PoA) Act.
              </p>
              <p className="text-muted-foreground mb-6">
                Powered by AI-driven verification, blockchain transparency, and Direct Benefit Transfer (DBT), our platform ensures that every eligible beneficiary receives timely support with dignity and transparency.
              </p>
              <div className="space-y-3">
                {[
                  'AI-powered case verification with explainability',
                  'Direct Benefit Transfer via PFMS integration',
                  'Real-time tracking with Justice Wallet & QR codes',
                  'Multi-stakeholder collaboration (Victims, NGOs, Officials)',
                  'Comprehensive audit trails and compliance monitoring'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src={digitalEmpowerment} 
                alt="Digital Empowerment" 
                className="rounded-lg shadow-elevated w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Comprehensive Feature Set</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built for all stakeholders in the relief ecosystem with role-based access and intelligent workflows
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-2 hover:border-primary transition-all hover-scale">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Flow Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">End-to-End Relief Process</h3>
            <p className="text-muted-foreground">Transparent, efficient, and accountable at every stage</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <img 
                src={reliefProcess} 
                alt="Relief Process" 
                className="rounded-lg shadow-elevated w-full"
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              {processSteps.map((process, index) => (
                <div key={index} className="flex gap-4 items-start animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {process.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{process.title}</h4>
                    <p className="text-muted-foreground text-sm">{process.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <Target className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-primary-foreground mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-primary-foreground/90 mb-8 text-lg">
              Join thousands of beneficiaries, NGOs, and officials using JusticeLink India to deliver justice digitally
            </p>
            <Button size="lg" variant="secondary" onClick={() => navigate('/login')} className="text-lg">
              Access Portal Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">© Ministry of Social Justice and Empowerment, Government of India – 2025</p>
          <p className="text-sm text-muted-foreground mt-2">Powered by National Informatics Centre (NIC)</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
