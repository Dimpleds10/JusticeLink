import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Search, Filter, CheckCircle2, XCircle, Clock, MapPin, TrendingUp, AlertTriangle } from 'lucide-react';
import { getCases, updateCase, getDistrictMetrics } from '@/lib/mockData';
import type { VictimCase } from '@/types';

const StateOfficial = () => {
  const [cases, setCases] = useState<VictimCase[]>([]);
  const [filteredCases, setFilteredCases] = useState<VictimCase[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCase, setSelectedCase] = useState<VictimCase | null>(null);
  const [districtMetrics, setDistrictMetrics] = useState<any[]>([]);

  useEffect(() => {
    loadCases();
    loadMetrics();
  }, []);

  useEffect(() => {
    filterCases();
  }, [cases, statusFilter, searchQuery]);

  const loadCases = () => {
    const allCases = getCases();
    setCases(allCases);
  };

  const loadMetrics = () => {
    const metrics = getDistrictMetrics();
    setDistrictMetrics(metrics);
  };

  const filterCases = () => {
    let filtered = [...cases];
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(c =>
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.district.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredCases(filtered);
  };

  const handleApproveCase = (caseId: string) => {
    const currentCase = cases.find(c => c.id === caseId);
    if (!currentCase) return;

    let newStatus: any = 'verified';
    if (currentCase.status === 'verified') newStatus = 'sanctioned';
    else if (currentCase.status === 'sanctioned') newStatus = 'disbursed';

    updateCase(caseId, { 
      status: newStatus,
      sanctionOrderNumber: newStatus === 'sanctioned' ? `SO/${new Date().getFullYear()}/${Math.floor(Math.random() * 10000)}` : undefined,
      dbtTransactionId: newStatus === 'disbursed' ? `DBT${Date.now()}` : undefined,
    });
    loadCases();
    loadMetrics();
  };

  const handleRejectCase = (caseId: string) => {
    updateCase(caseId, { status: 'rejected', verificationNotes: 'Documents verification failed' });
    loadCases();
    loadMetrics();
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'pending';
      case 'verified': return 'verified';
      case 'sanctioned': return 'info';
      case 'disbursed': return 'approved';
      case 'rejected': return 'rejected';
      default: return 'default';
    }
  };

  const getDaysSinceSubmission = (filingDate: string) => {
    const today = new Date();
    const filed = new Date(filingDate);
    const diffTime = Math.abs(today.getTime() - filed.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const performanceData = districtMetrics.map(m => ({
    district: m.district,
    Verified: m.verified,
    Sanctioned: m.sanctioned,
    Disbursed: m.disbursed,
  }));

  const heatmapData = districtMetrics.map(m => ({
    district: m.district,
    cases: m.totalCases,
    compliance: m.slaCompliance,
  }));

  return (
    <Layout title="State Official Portal" role="State Official">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Dashboard Overview */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{cases.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-warning">{cases.filter(c => c.status === 'pending').length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Verified</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-info">{cases.filter(c => c.status === 'verified').length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Disbursed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-success">{cases.filter(c => c.status === 'disbursed').length}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="cases" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cases">Case Queue</TabsTrigger>
            <TabsTrigger value="performance">Performance Analytics</TabsTrigger>
            <TabsTrigger value="heatmap">District Heatmap</TabsTrigger>
          </TabsList>

          <TabsContent value="cases" className="space-y-4">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Filter Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by Case ID, Name, or District"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="sanctioned">Sanctioned</SelectItem>
                      <SelectItem value="disbursed">Disbursed</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Cases List */}
            <div className="space-y-3">
              {filteredCases.map((caseItem) => (
                <Card key={caseItem.id} className="hover:shadow-card transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-bold text-lg">{caseItem.id}</h3>
                          <Badge variant={getStatusBadgeVariant(caseItem.status)}>
                            {caseItem.status.toUpperCase()}
                          </Badge>
                          {getDaysSinceSubmission(caseItem.filingDate) > 7 && caseItem.status === 'pending' && (
                            <Badge variant="warning" className="flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              SLA Breach
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Name:</span>
                            <span className="ml-2 font-medium">{caseItem.name}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">District:</span>
                            <span className="ml-2 font-medium">{caseItem.district}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Category:</span>
                            <span className="ml-2 font-medium">{caseItem.category}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Days:</span>
                            <span className="ml-2 font-medium">{getDaysSinceSubmission(caseItem.filingDate)}d</span>
                          </div>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Amount:</span>
                          <span className="ml-2 font-bold text-success">₹{caseItem.amount?.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        {caseItem.status !== 'disbursed' && caseItem.status !== 'rejected' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleApproveCase(caseItem.id)}
                              className="bg-success hover:bg-success/90"
                            >
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              {caseItem.status === 'pending' ? 'Verify' : 
                               caseItem.status === 'verified' ? 'Sanction' : 'Disburse'}
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleRejectCase(caseItem.id)}
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedCase(caseItem)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredCases.length === 0 && (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Cases Found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <div>
                    <CardTitle>District Performance Overview</CardTitle>
                    <CardDescription>Cases verified, sanctioned, and disbursed by district</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="district" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Verified" fill="hsl(var(--info))" />
                    <Bar dataKey="Sanctioned" fill="hsl(var(--warning))" />
                    <Bar dataKey="Disbursed" fill="hsl(var(--success))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="heatmap">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-primary" />
                  <div>
                    <CardTitle>District Relief Density Heatmap</CardTitle>
                    <CardDescription>Visual representation of case distribution and SLA compliance</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {heatmapData.map((data) => (
                    <Card 
                      key={data.district}
                      className="border-2"
                      style={{
                        borderColor: data.cases > 15 ? 'hsl(var(--destructive))' :
                                   data.cases > 5 ? 'hsl(var(--warning))' :
                                   'hsl(var(--success))',
                        backgroundColor: data.cases > 15 ? 'hsl(var(--destructive) / 0.1)' :
                                        data.cases > 5 ? 'hsl(var(--warning) / 0.1)' :
                                        'hsl(var(--success) / 0.1)'
                      }}
                    >
                      <CardHeader>
                        <CardTitle className="text-base">{data.district}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Total Cases</span>
                          <span className="font-bold">{data.cases}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">SLA Compliance</span>
                          <span className="font-bold">{data.compliance}%</span>
                        </div>
                        <div className="mt-3">
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${data.compliance}%`,
                                backgroundColor: data.compliance > 80 ? 'hsl(var(--success))' :
                                               data.compliance > 60 ? 'hsl(var(--warning))' :
                                               'hsl(var(--destructive))'
                              }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Legend</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-success/20 border-2 border-success rounded" />
                      <span>Low Density (&lt;5 cases)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-warning/20 border-2 border-warning rounded" />
                      <span>Medium (5-15 cases)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-destructive/20 border-2 border-destructive rounded" />
                      <span>High (&gt;15 cases)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StateOfficial;
