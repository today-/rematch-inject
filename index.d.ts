import * as React from 'react';
import { Connect } from 'react-redux';

export type IReactComponent<P = any> =
    | React.StatelessComponent<P>
    | React.ComponentClass<P>
    | React.ClassicComponentClass<P>

export type IWrappedComponent<P> = {
    wrappedComponent: IReactComponent<P>
    wrappedInstance: React.ReactInstance | undefined
}

export type IValueMap = { [key: string]: any }
export type IStoresToProps<
    S extends IValueMap = {},
    P extends IValueMap = {},
    I extends IValueMap = {},
    C extends IValueMap = {}
    > = (stores: S, nextProps: P, context: C) => I

export interface Inject extends Connect {
    (
        ...stores: string[]
    ): <T extends IReactComponent<any>>(
        target: T
    ) => T & (T extends IReactComponent<infer P> ? IWrappedComponent<P> : never);

    <RootState>(
        ...stores: (keyof RootState)[]
    ): <T extends IReactComponent<any>>(
        target: T
    ) => T & (T extends IReactComponent<infer P> ? IWrappedComponent<P> : never);

    <S, P, I, C>(
        fn: IStoresToProps<S, P, I, C>
    ): <T extends IReactComponent>(target: T) => T & IWrappedComponent<P>;
}

export const inject: Inject;

interface IModel {
    name: string;
    state: any;
}

type Without<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type Injected<Store extends IModel> = Partial<{
    [k in Store['name']]: Store['state'];
} & Without<Store, keyof IModel>>;
