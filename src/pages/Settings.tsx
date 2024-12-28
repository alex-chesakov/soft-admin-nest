import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Store Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Store Name</label>
              <Input defaultValue="My Store" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <Input type="email" defaultValue="store@example.com" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <Input type="tel" defaultValue="+1 234 567 890" className="mt-1" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Currency</label>
              <Input defaultValue="USD" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Payment Methods</label>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="stripe" className="mr-2" defaultChecked />
                  <label htmlFor="stripe">Stripe</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="paypal" className="mr-2" defaultChecked />
                  <label htmlFor="paypal">PayPal</label>
                </div>
              </div>
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;