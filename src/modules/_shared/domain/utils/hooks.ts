// @ts-nocheck
import isEqual from 'lodash/isEqual';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useMemoOne as useBaseMemoOne } from 'use-memo-one';

// thanks Kent C Dodds for the following helpers

export function useSafeSetState<T>(
    initialState?: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [state, setState] = useState(initialState);

    const mountedRef = useRef(false);
    useEffect(() => {
        mountedRef.current = true;
        return () => (mountedRef.current = false);
    }, []);
    const safeSetState = useCallback(
        (args) => {
            if (mountedRef.current) {
                return setState(args);
            }
        },
        [mountedRef, setState]
    );

    return [state, safeSetState];
}

export function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export function useDeepCompareEffect(callback, inputs) {
    const cleanupRef = useRef();
    useEffect(() => {
        if (!isEqual(previousInputs, inputs)) {
            cleanupRef.current = callback();
        }
        return cleanupRef.current;
    });
    const previousInputs = usePrevious(inputs);
}

export function useTimeout(ms = 0) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let timer = setTimeout(() => {
            setReady(true);
        }, ms);

        return () => {
            clearTimeout(timer);
        };
    }, [ms]);

    return ready;
}

export function useMemoOne(fn: () => unknown, list?: any[]) {
    return useBaseMemoOne(fn, list);
}
