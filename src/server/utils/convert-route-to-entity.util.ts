const mapping: Record<string, string> = {
  doctors: 'doctor',
  hospitals: 'hospital',
  patients: 'patient',
  providers: 'provider',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
