import DividerWithText from '@/components/DividerWithText';
import CardFooterContent from '@/components/LoginRegisterPage/CardFooterContent';
import FormHeader from '@/components/LoginRegisterPage/FormHeader';
import LoginForm from '@/components/LoginRegisterPage/LoginForm';
import RegisterForm from '@/components/LoginRegisterPage/RegisterForm';
import SocialAuthButtons from '@/components/LoginRegisterPage/SocialAuthButtons';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function LoginRegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4 min-w-[320px]">
      <Card className="w-full max-w-md">
        <FormHeader />

        <CardContent className="flex flex-col gap-4">
          <Tabs defaultValue="login">
            <TabsList className="w-full">
              <TabsTrigger value="login" className="w-full">
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="w-full">
                Register
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>

          <DividerWithText />
          <SocialAuthButtons />
        </CardContent>

        <CardFooter>
          <CardFooterContent />
        </CardFooter>
      </Card>
    </main>
  );
}