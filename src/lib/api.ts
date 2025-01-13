export async function getTasksAndCategoriesFromApi(
  apiRoute: string,
  userId: string,
  errorMesage: string,
) {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/${apiRoute}?userId=${encodeURIComponent(userId)}`,
      {
        cache: 'force-cache',
      },
    );

    if (!res.ok) {
      return { error: errorMesage };
    }

    return await res.json();
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
