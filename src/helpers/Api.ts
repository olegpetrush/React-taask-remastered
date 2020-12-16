import { isLocalhost } from '../serviceWorker';
import { ApiResponse } from '../interfaces/ApiResponse';
import { UserLoggedIn } from '../interfaces/UserLoggedIn';
import { Country } from '../interfaces/Country';
import { Task } from '../interfaces/Task';
import { Industry } from '../interfaces/Industry';
import { Administrator } from '../interfaces/Administrator';
import { Consumer } from '../interfaces/Consumer';
import { Merchant } from '../interfaces/Merchant';
import { getCookie } from './Cookies';
import { Invoice } from '../interfaces/Invoice';
import { Language } from '../interfaces/Language';

export const getApiUrl = (): string => {
  if (isLocalhost) {
    return 'http://app.clubtimize.dk';
  }
  return 'http://app.clubtimize.dk';
};

export class Api {
  static async signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserLoggedIn> {
    let apiResponse: ApiResponse = await this.customFetch('/authenticate', {
      username: email,
      password: password,
    });
    if (apiResponse.code === 200) {
      return apiResponse.result as UserLoggedIn;
    } else {
      throw new Error(apiResponse.status);
    }
  }

  static async createUser(user: any) {
    let suffix;
    switch (user.role) {
      case 'MERCHANT':
        suffix = '/v1/merchant';
        break;
      case 'CONSUMER':
        suffix = '/v1/consumer';
        break;
      case 'ADMIN':
        suffix = '/v1/administrator';
        break;
    }
    let apiResponse: ApiResponse = await this.customFetch(suffix, user);
    if (apiResponse.code === 201) {
      return { email: user.email, password: user.password };
    } else {
      throw new Error('');
    }
  }
  static customPatchFetch = async (
    suffix: string,
    bodyIn: any,
    headersIn?: any
  ): Promise<ApiResponse> => {
    let request: { [key: string]: any } = {
      method: 'PATCH',
      headers: {
        ...headersIn,
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('user_token'),
      },
    };
    request = { ...request, body: JSON.stringify(bodyIn) };
    let response: Response = await fetch(getApiUrl() + suffix, request);
    return response.json().then((obj) => obj as Promise<ApiResponse>);
  };

  static customFetch = async (
    suffix: string,
    bodyIn: any,
    headersIn?: any
  ): Promise<ApiResponse> => {
    let request: { [key: string]: any } = {
      method: 'POST',
      headers: {
        ...headersIn,
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('user_token'),
      },
    };
    request = { ...request, body: JSON.stringify(bodyIn) };
    let response: Response = await fetch(getApiUrl() + suffix, request);
    return response.json().then((obj) => obj as Promise<ApiResponse>);
  };
  static customGetFetch = async (
    suffix: string,
    headersIn: any
  ): Promise<ApiResponse> => {
    let request: { [key: string]: any } = {
      method: 'GET',
      headers: {
        ...headersIn,
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('user_token'),
      },
    };
    let response: Response = await fetch(getApiUrl() + suffix, request);
    return response.json().then((obj) => obj as Promise<ApiResponse>);
  };

  static fetchCountries = async (locale: string): Promise<Country[]> => {
    let response: ApiResponse = await Api.customGetFetch('/v1/countries', {
      'Accept-Language': locale,
    });
    if (response.code === 200) {
      return response.result.countries.map((x) => x.country) as Country[];
    } else {
      throw new Error();
    }
  };

  static fetchTasks = async (
    onlyActive: boolean,
    locale: string
  ): Promise<Task[]> => {
    let response: ApiResponse = await Api.customGetFetch(
      '/v1/tasks?active_only=' + (onlyActive ? 'true' : 'false'),
      { 'Accept-Language': locale }
    );
    if (response.code === 200) {
      return response.result.tasks.map((task) => {
        return {
          ...task.task,
          consumer: {
            ...task.task.consumer.consumer,
            country: task.task.consumer.consumer.country.country,
          },
          industry: task.task.branch.branch,
        };
      }) as Task[];
    } else {
      throw new Error();
    }
  };

  static fetchInvoices = async (locale: string): Promise<Invoice[]> => {
    let response: ApiResponse = await Api.customGetFetch(
      '/v1/merchant/payments',
      { 'Accept-Language': locale }
    );
    if (response.code === 200) {
      return response.result.invoices.map((invoice) => {
        return { ...invoice.invoice };
      }) as Invoice[];
    } else {
      throw new Error();
    }
  };

  static fetchMyTasks = async (
    onlyActive: boolean,
    locale: string
  ): Promise<Task[]> => {
    let response: ApiResponse = await Api.customGetFetch('/v1/mytasks', {
      'Accept-Language': locale,
    });
    if (response.code === 200) {
      return response.result.tasks.map((task) => {
        return {
          ...task.task,
          consumer: {
            ...task.task.consumer.consumer,
            country: task.task.consumer.consumer.country.country,
          },
          industry: task.task.branch.branch,
        };
      }) as Task[];
    } else {
      throw new Error();
    }
  };

  static fetchTask = async (id: number, locale: string): Promise<Task> => {
    let response: ApiResponse = await Api.customGetFetch('/v1/task/' + id, {
      'Accept-Language': locale,
    });
    if (response.code === 200) {
      let task = response.result.task;
      task = {
        ...task,
        consumer: task.consumer.consumer,
        branch: task.branch.branch,
      };
      task.consumer = {
        ...task.consumer,
        country: task.consumer.country.country,
      };
      return task as Task;
    } else {
      throw new Error();
    }
  };

  static fetchProfile = async (
    locale: string
  ): Promise<Consumer | Merchant | Administrator> => {
    let response: ApiResponse = await Api.customGetFetch('/v1/profile', {
      'Accept-Language': locale,
    });
    if (response.code === 200) {
      if (response.result.merchant) {
        return response.result.merchant as Merchant;
      } else if (response.result.consumer) {
        return response.result.consumer as Consumer;
      } else if (response.result.administrator) {
        return response.result.consumer as Administrator;
      }
      throw new Error();
    } else {
      throw new Error();
    }
  };

  static unlockTask = async (
    superOffer: boolean,
    id: number,
    locale: string
  ): Promise<void> => {
    let response: ApiResponse = await Api.customFetch(
      '/v1/task/' + id + '?super_offer=' + superOffer.toString(),
      {},
      {
        'Accept-Language': locale,
      }
    );
    if (response.code === 201) {
      return;
    } else {
      throw new Error(response.status);
    }
  };

  static fetchIndustries = async (locale: string): Promise<Industry[]> => {
    let response: ApiResponse = await Api.customGetFetch('/v1/branches', {
      'Accept-Language': locale,
    });
    if (response.code === 200) {
      return response.result.branches.map((branch) => {
        return {
          ...branch.branch,
        };
      }) as Industry[];
    } else {
      throw new Error(response.status);
    }
  };

  static createConsumer = async (props: any, locale: string): Promise<void> => {
    let userResponse: ApiResponse = await Api.customFetch(
      '/v1/consumer',
      props,
      {
        'Accept-Language': locale,
      }
    );
    if (userResponse.code === 201) {
      let userId = userResponse.result.consumer.id;
      let taskResponse: ApiResponse = await Api.customFetch(
        '/v1/consumer/' + userId.toString() + '/task',
        props,
        {
          'Accept-Language': locale,
        }
      );
      if (taskResponse.code === 201) {
        return;
      } else {
        throw new Error(userResponse.status);
      }
    } else {
      throw new Error(userResponse.status);
    }
  };

  static createTask = async (task: any, locale: string): Promise<void> => {
    let taskResponse: ApiResponse = await Api.customFetch(
      '/v1/consumer/' + task.user_id.toString() + '/task',
      task,
      {
        'Accept-Language': locale,
      }
    );
    if (taskResponse.code === 201) {
      return;
    } else {
      throw new Error(taskResponse.status);
    }
  };

  static updateMerchantProfile = async (
    props: any,
    locale: string
  ): Promise<void> => {
    let response: ApiResponse = await Api.customPatchFetch(
      '/v1/merchant/' + props.id,
      props,
      {
        'Accept-Language': locale,
      }
    );
    if (response.code === 202) {
      return;
    } else {
      throw new Error();
    }
  };

  static updateConsumerProfile = async (
    props: any,
    locale: string
  ): Promise<void> => {
    let response: ApiResponse = await Api.customPatchFetch(
      '/v1/consumer/' + props.id,
      props,
      {
        'Accept-Language': locale,
      }
    );
    if (response.code === 202) {
      return;
    } else {
      throw new Error();
    }
  };

  static updateMerchantPlan = async (
    props: any,
    locale: string
  ): Promise<void> => {
    let response: ApiResponse = await Api.customFetch(
      '/v1/merchant/plan',
      props,
      {
        'Accept-Language': locale,
      }
    );
    if (response.code === 200) {
      return;
    } else {
      throw new Error();
    }
  };

  static fetchDashboard = async (locale: string): Promise<any> => {
    let response: ApiResponse = await Api.customGetFetch(
      '/v1/merchant/dashboard',
      {
        'Accept-Language': locale,
      }
    );
    if (response.code === 200) {
      return response.result;
    } else {
      throw new Error();
    }
  };
  static toggleTask = async (task: Task, locale: string): Promise<void> => {
    let response: ApiResponse = await Api.customFetch(
      '/v1/task/' + task.id + '/toggle',
      {
        'Accept-Language': locale,
      }
    );
    if (response.code === 200) {
      return;
    } else {
      throw new Error();
    }
  };

  static fetchLabels = async (locale: string): Promise<any> => {
    let response: ApiResponse = await Api.customGetFetch('/v1/labels', {
      'Accept-Language': locale,
    });
    if (response.code === 200) {
      return response.result.labels as any;
    } else {
      throw new Error();
    }
  };

  static translateLabel = async (label_id, new_value, locale) => {
    let response: ApiResponse = await Api.customPatchFetch(
      '/v1/label/' + label_id,
      { value: new_value },
      {
        'Accept-Language': locale,
      }
    );
    if (response.code === 200) {
      return;
    } else {
      throw new Error();
    }
  };
  static fetchLanguages = async (locale): Promise<Language[]> => {
    let response: ApiResponse = await Api.customGetFetch('/v1/languages/', {
      'Accept-Language': locale,
    });
    if (response.code === 200) {
      return response.result.languages.map((x) => x.language);
    } else {
      throw new Error();
    }
  };

  static fetchConsumers = async (locale): Promise<Consumer[]> => {
    let response: ApiResponse = await Api.customGetFetch('/v1/consumers/', {
      'Accept-Language': locale,
    });
    if (response.code === 200) {
      return response.result.consumers.map((x) => {
        return { ...x.consumer, country: x.consumer.country.country };
      });
    } else {
      throw new Error();
    }
  };
}

export default Api;
