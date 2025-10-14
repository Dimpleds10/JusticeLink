import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { Globe, TrendingUp, IndianRupee, Clock, MapPin, FileText, Users } from 'lucide-react';
import { getStateMetrics, getCases } from '@/lib/mockData';

const Central = () => {
  const [stateMetrics, setStateMetrics] = useState<any[]>([]);
  const [totalStats, setTotalStats] = useState({
    totalCases: 0,
    totalFunds: 0,
    avgDelay: 0,
    avgCompliance: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const metrics = getStateMetrics();
    setStateMetrics(metrics);

    const total = metrics.reduce(
      (acc, state) => ({
        totalCases: acc.totalCases + state.totalCases,
        totalFunds: acc.totalFunds + state.totalFundsDisbursed,
        avgDelay: acc.avgDelay + state.avgDelayDays,
        avgCompliance: acc.avgCompliance + state.slaCompliance,
      }),
      { totalCases: 0, totalFunds: 0, avgDelay: 0, avgCompliance: 0 }
    );

    setTotalStats({
      totalCases: total.totalCases,
      totalFunds: total.totalFunds,
      avgDelay: Math.round(total.avgDelay / metrics.length),
      avgCompliance: Math.round(total.avgCompliance / metrics.length),
    });
  };

  const fundsData = stateMetrics.map(s => ({
    state: s.state,
    allocated: s.totalFundsAllocated / 1000000,
    disbursed: s.totalFundsDisbursed / 1000000,
  }));

  const complianceData = stateMetrics.map(s => ({
    state: s.state,
    compliance: s.slaCompliance,
  }));

  const statusDistribution = [
    { name: 'Pending', value: getCases().filter(c => c.status === 'pending').length, color: 'hsl(var(--warning))' },
    { name: 'Verified', value: getCases().filter(c => c.status === 'verified').length, color: 'hsl(var(--info))' },
    { name: 'Sanctioned', value: getCases().filter(c => c.status === 'sanctioned').length, color: 'hsl(var(--accent))' },
    { name: 'Disbursed', value: getCases().filter(c => c.status === 'disbursed').length, color: 'hsl(var(--success))' },
  ];

  return (
    <Layout title="Central Ministry (MSJE)" role="Ministry of Social Justice & Empowerment">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-l-4 border-l-primary bg-gradient-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Globe className="w-10 h-10 text-primary" />
              <div>
                <CardTitle className="text-2xl">National Dashboard</CardTitle>
                <CardDescription>Ministry of Social Justice and Empowerment - PCR/PoA DBT Oversight</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* National Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Beneficiaries</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalStats.totalCases.toLocaleString('en-IN')}</p>
              <p className="text-xs text-muted-foreground mt-1">Across all states</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-success" />
                <CardTitle className="text-sm font-medium text-muted-foreground">Funds Disbursed</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-success">₹{(totalStats.totalFunds / 10000000).toFixed(1)}Cr</p>
              <p className="text-xs text-muted-foreground mt-1">Financial year 2024-25</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-warning" />
                <CardTitle className="text-sm font-medium text-muted-foreground">Avg Delay</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-warning">{totalStats.avgDelay}d</p>
              <p className="text-xs text-muted-foreground mt-1">National average</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-info" />
                <CardTitle className="text-sm font-medium text-muted-foreground">SLA Compliance</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-info">{totalStats.avgCompliance}%</p>
              <p className="text-xs text-muted-foreground mt-1">National average</p>
            </CardContent>
          </Card>
        </div>

        {/* State-wise Fund Utilization */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <IndianRupee className="w-6 h-6 text-success" />
              <div>
                <CardTitle>State-wise Fund Utilization</CardTitle>
                <CardDescription>Allocated vs Disbursed (in Crores)</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={fundsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="state" />
                <YAxis label={{ value: 'Amount (Cr)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value: any) => `₹${value}Cr`} />
                <Legend />
                <Bar dataKey="allocated" fill="hsl(var(--accent))" name="Allocated" />
                <Bar dataKey="disbursed" fill="hsl(var(--success))" name="Disbursed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* State Performance Heatmap */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-primary" />
                <div>
                  <CardTitle>State Delay Heatmap</CardTitle>
                  <CardDescription>Average processing delays by state</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stateMetrics.map((state) => (
                  <div key={state.state}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{state.state}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{state.avgDelayDays} days</span>
                        <Badge
                          variant={
                            state.avgDelayDays < 5 ? 'approved' :
                            state.avgDelayDays < 10 ? 'pending' : 'rejected'
                          }
                        >
                          {state.avgDelayDays < 5 ? 'Good' : state.avgDelayDays < 10 ? 'Average' : 'High'}
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="h-3 rounded-full transition-all"
                        style={{
                          width: `${Math.min((state.avgDelayDays / 15) * 100, 100)}%`,
                          backgroundColor:
                            state.avgDelayDays < 5 ? 'hsl(var(--success))' :
                            state.avgDelayDays < 10 ? 'hsl(var(--warning))' :
                            'hsl(var(--destructive))'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Case Status Distribution */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                <div>
                  <CardTitle>National Case Distribution</CardTitle>
                  <CardDescription>Status breakdown of all cases</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {statusDistribution.map((status) => (
                  <div key={status.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }} />
                    <span className="text-sm">{status.name}: {status.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SLA Compliance Performance Bar */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-info" />
              <div>
                <CardTitle>State SLA Compliance Performance</CardTitle>
                <CardDescription>Percentage of cases meeting service level agreements</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={complianceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="state" />
                <YAxis domain={[0, 100]} label={{ value: 'Compliance %', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value: any) => `${value}%`} />
                <Legend />
                <Bar dataKey="compliance" fill="hsl(var(--info))" name="SLA Compliance" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* State Rankings */}
        <Card>
          <CardHeader>
            <CardTitle>State Performance Rankings</CardTitle>
            <CardDescription>Based on SLA compliance and fund utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[...stateMetrics]
                .sort((a, b) => b.slaCompliance - a.slaCompliance)
                .map((state, index) => (
                  <div key={state.state} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      index === 0 ? 'bg-success text-success-foreground' :
                      index === 1 ? 'bg-info text-info-foreground' :
                      index === 2 ? 'bg-warning text-warning-foreground' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{state.state}</h4>
                      <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                        <span>Compliance: {state.slaCompliance}%</span>
                        <span>Utilization: {((state.totalFundsDisbursed / state.totalFundsAllocated) * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Policy Insights */}
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle>AI-Generated Policy Insights</CardTitle>
                <CardDescription>Automated recommendations based on national trends</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-info/10 border border-info/20 rounded-lg p-4">
              <h4 className="font-semibold text-info mb-2">⚡ Recommendation: Focus on Delay Reduction</h4>
              <p className="text-sm text-foreground/80">
                States with avg delay &gt;10 days need immediate intervention. Consider deploying additional verification staff
                or implementing automated document verification systems.
              </p>
            </div>
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <h4 className="font-semibold text-success mb-2">✓ Best Practice: NGO Integration Success</h4>
              <p className="text-sm text-foreground/80">
                Districts with active NGO partnerships show 35% faster processing. Recommend expanding NGO onboarding program nationally.
              </p>
            </div>
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <h4 className="font-semibold text-warning mb-2">⚠ Alert: Fund Utilization Gap</h4>
              <p className="text-sm text-foreground/80">
                Overall utilization at 65%. Consider awareness campaigns and simplified application processes in underperforming districts.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Central;
