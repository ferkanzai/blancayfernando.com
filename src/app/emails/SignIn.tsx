import {
  Button,
  Head,
  Heading,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";

export function SignIn({ url, to }: { url: string; to: string }) {
  return (
    <>
      <Preview>Accede a blancayfernando.com como admin</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                primary: {
                  DEFAULT: "#445942",
                },
              },
            },
          },
        }}
      >
        <Head />
        <Heading as="h1" className="text-xl">
          Hola <span className="text-base text-primary">{to}</span>,
        </Heading>
        <Text className="my-6 text-base">
          Para acceder a la web como admin, haz click en el siguiente botón:
        </Text>
        <Button
          href={url}
          className="rounded-md bg-primary px-5 py-1 text-lg font-medium text-white"
        >
          Accede a Blanca y Fernando
        </Button>
        <Text className="mt-6 text-sm">
          Copyright © {new Date().getFullYear()} Fernando Carmona
        </Text>
      </Tailwind>
    </>
  );
}

export default SignIn;
