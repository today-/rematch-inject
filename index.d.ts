import * as React from 'react';
import { Connect, DispatchProp } from 'react-redux';

export type IReactComponent<P = any> =
    | React.StatelessComponent<P>
    | React.ComponentClass<P>
    | React.ClassicComponentClass<P>;

export type IValueMap = { [key: string]: any };
export type IStoresToProps<
    S extends IValueMap = {},
    P extends IValueMap = {},
    I extends IValueMap = {},
    C extends IValueMap = {}
    > = (stores: S, nextProps: P, context: C) => I;

type ComponentInjector = <T extends IReactComponent>(target: T) => T;

export interface Inject extends Connect {
    (
        ...stores: string[]
    ): ComponentInjector;

    <RootState>(
        ...stores: (keyof RootState)[]
    ): ComponentInjector;

    <S, P, I, C>(
        fn: IStoresToProps<S, P, I, C>
    ): ComponentInjector;
}

export const inject: Inject;

interface IModel {
    name: string;
    state: any;
}

type Without<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type InjectedSelector<Selector extends (a: any) => any> = Partial<ReturnType<Selector> & DispatchProp>

export type InjectedStore<Store extends IModel> = Partial<{
    [k in Store['name']]: Store['state'];
} & Without<Store, keyof IModel> & DispatchProp>;

export type Injected<S> = S extends IModel ? InjectedStore<S> : S extends (a: any) => any ? InjectedSelector<S> : {};

