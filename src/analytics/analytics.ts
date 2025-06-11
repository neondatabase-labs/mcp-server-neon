import { Analytics } from '@segment/analytics-node';
import { ANALYTICS_WRITE_KEY } from '../constants.js';
import { Api, AuthDetailsResponse } from '@neondatabase/api-client';
import { AuthContext } from '../types/auth.js';

let analytics: Analytics | undefined;
type Account = AuthContext['extra']['account'];
export const initAnalytics = () => {
  if (ANALYTICS_WRITE_KEY) {
    analytics = new Analytics({
      writeKey: ANALYTICS_WRITE_KEY,
      host: 'https://track.neon.tech',
    });
  }
};

export const identify = (
  account: Account | null,
  params: Omit<Parameters<Analytics['identify']>[0], 'userId' | 'anonymousId'>,
) => {
  if (account) {
    analytics?.identify({
      ...params,
      userId: account.id,
      traits: {
        name: account.name,
        email: account.email,
        isOrg: account.isOrg,
      },
    });
  } else {
    analytics?.identify({
      ...params,
      anonymousId: 'anonymous',
    });
  }
};

export const track = (params: Parameters<Analytics['track']>[0]) => {
  analytics?.track(params);
};

/**
 * Util for identifying the user based on the auth method. If the api key belongs to an organization, identify the organization instead of user details.
 */
export const identifyApiKey = async (
  auth: AuthDetailsResponse,
  neonClient: Api<unknown>,
  params: Omit<Parameters<Analytics['identify']>[0], 'userId' | 'anonymousId'>,
) => {
  if (auth.auth_method === 'api_key_org') {
    const { data: org } = await neonClient.getOrganization(auth.account_id);
    const account = {
      id: auth.account_id,
      name: org.name,
      isOrg: true,
    };
    identify(account, params);
    return account;
  }
  const { data: user } = await neonClient.getCurrentUserInfo();
  const account = {
    id: user.id,
    name: user.name,
    email: user.email,
    isOrg: false,
  };
  identify(account, params);
  return account;
};
