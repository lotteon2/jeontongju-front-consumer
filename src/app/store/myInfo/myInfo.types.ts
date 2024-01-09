export interface MyInfoState {
  isLogin: boolean;
  email: string;
  memberId: number;
  profileImageUrl: string;
  name: string;
  isAdult: boolean;
  isRegularPayment: boolean;
  point: number;
  credit: number;
  phoneNumber: string;
  isAddressDefault: boolean;
  isPaymentReservation: boolean;
}

export interface MyInfoDispatcher extends MyInfoState {
  dispatchIsLogin: (value: boolean) => void;
  dispatchMemberId: (value: number) => void;
  dispatchEmail: (value: string) => void;
  dispatchProfileImageUrl: (value: string) => void;
  dispatchIsAdult: (value: boolean) => void;
  dispatchIsRegularPayment: (value: boolean) => void;
  dispatchPoint: (value: number) => void;
  dispatchIsPaymentReservation: (value: boolean) => void;
  clear: () => void;
}
