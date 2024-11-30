import { LoginForm } from '@/components/login-form'
import { RegisterForm } from '@/components/register-form'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function Auth() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center space-y-4">
      <img
        src="edutech-solutions.png"
        alt="Edutech Solutions Logo"
        className="h-36 dark:bg-white p-4 dark:rounded"
      />
      <Tabs defaultValue="login" className="sm:w-[1000px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login to InternTrack System with your credentials to start using the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card className="w-96 sm:w-[1000px]">
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>
                Register as student, advisor or supervisor for internship tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterForm />
            </CardContent>
            <CardFooter className="justify-end">
              <Button form="register-form" type="submit">
                Register
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
