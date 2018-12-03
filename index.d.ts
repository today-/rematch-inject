import * as React from 'react';

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

export function inject(
    ...stores: string[]
): <T extends IReactComponent<any>>(
    target: T
) => T & (T extends IReactComponent<infer P> ? IWrappedComponent<P> : never)

export function inject<S, P, I, C>(
    fn: IStoresToProps<S, P, I, C>
): <T extends IReactComponent>(target: T) => T & IWrappedComponent<P>
