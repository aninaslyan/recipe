import { ActionCreator, createAction } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

export function createHTTPActions<
  RequestPayload = void,
  ResponsePayload = void,
  ErrorPayload = Error,
>(
  actionType: string,
): [
  ActionCreator<
    string,
    (props: RequestPayload) => {
      payload: RequestPayload;
    } & TypedAction<string>
  >,
  ActionCreator<
    string,
    (
      message: string,
      props?: ResponsePayload,
      showMessage?: boolean,
      customTitle?: string,
    ) => {
      payload: ResponsePayload;
      success: boolean;
      message: string;
      showMessage: boolean;
      customTitle: string;
    } & TypedAction<string>
  >,
  ActionCreator<
    string,
    (
      props: ErrorPayload,
      showMessage?: boolean,
    ) => {
      payload: ErrorPayload;
      success: boolean;
      showMessage: boolean;
    } & TypedAction<string>
  >,
] {
  return [
    createAction(actionType, (payload: RequestPayload) => ({ payload })),
    createAction(
      `${actionType} Success`,
      (
        message: string,
        payload?: ResponsePayload,
        showMessage = false,
        customTitle = '',
      ) => ({
        payload,
        message,
        success: true,
        showMessage,
        customTitle,
      }),
    ),
    createAction(
      `${actionType} Error`,
      (payload: ErrorPayload, showMessage = true) => ({
        payload,
        success: false,
        showMessage,
      }),
    ),
  ];
}
