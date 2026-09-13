import ApiClient from './ApiClient'

export type PlanName = 'BASIC' | 'STANDARD' | 'PROFESSIONAL'

export const PLAN_DISPLAY_NAMES: Record<PlanName, string> = {
  BASIC: 'Basic',
  STANDARD: 'Standard',
  PROFESSIONAL: 'Professional',
}

export function getPlanDisplayName(plan?: PlanName | null): string {
  return plan ? PLAN_DISPLAY_NAMES[plan] : 'Basic'
}

export interface UserProfileState {
  email: string
  firstName: string
  lastName: string
  emailVerified: boolean
  id: string
  plan?: PlanName | null
}

export default class UserService {
  private static readonly userBasePath = '/users'
  static async getUserProfile(): Promise<UserProfileState> {
    const userResponse = await ApiClient.get<UserProfileState>(
      `${this.userBasePath}/me`
    )
    return userResponse.data
  }

  static async updateProfile(data: { firstName: string; lastName: string }): Promise<UserProfileState> {
    const response = await ApiClient.put<UserProfileState, { firstName: string; lastName: string }>(
      `${this.userBasePath}/me`,
      data
    )
    return response.data
  }
}
