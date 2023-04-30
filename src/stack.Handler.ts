export async function handler(event: AWSLambda.SQSEvent) {
  console.log(JSON.stringify(event));

  const response = await fetch(process.env.HTTP_TARGET!);
  console.log(response.body);
}

