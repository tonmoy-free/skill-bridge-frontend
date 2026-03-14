import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, Calendar, ShieldCheck, User as UserIcon } from "lucide-react";
import Link from "next/link";


export default function StudentProfilePageComponent({ user }: { user: any }) {
  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <div className="flex flex-col md:flex-row gap-8 items-start">

        {/* Left Column: Profile Card */}
        <Card className="w-full md:w-1/3">
          <CardContent className="pt-6 text-center">
            <Avatar className="h-24 w-24 mx-auto mb-4 border-2 border-primary/10">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-sm text-muted-foreground mb-4">{user.email}</p>
            <div className="flex justify-center gap-2">
              <Badge variant={user.status === "ACTIVE" ? "default" : "destructive"}>
                {user.status}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {user.role?.toLowerCase()}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Details & Settings */}
        <div className="flex-1 w-full">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Personal Info</TabsTrigger>
              <TabsTrigger value="account">Account Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <UserIcon className="h-5 w-5" /> Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2"><Mail size={14} /> Email</Label>
                      <div className="flex items-center gap-2">
                        <Input value={user.email} readOnly className="bg-muted/50" />
                        {user.emailVerified && <ShieldCheck className="text-green-500" size={20} />}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2"><Phone size={14} /> Phone</Label>
                      <Input value={user.phone || "Not provided"} readOnly className="bg-muted/50" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Calendar size={14} /> Joined On</Label>
                    <p className="text-sm border p-2 rounded-md bg-muted/30">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Update Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* This is where your form from previous questions would go */}
                  <Link href={`/dashboard/student-profile/${user.id}`}>
                  <Button variant="outline" className="w-full">Edit Profile Details</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

    </div>
    </div >
  );
}