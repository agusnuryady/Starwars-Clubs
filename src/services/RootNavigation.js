import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()

export function navigate(name, params) {
    if (navigationRef.current.isReady()) {
        navigationRef.current.navigate(name, params);
    }
}

export function goBack() {
    if (navigationRef.current.isReady()) {
        navigationRef.current.goBack();
    }
}

export function reset(name) {
    if (navigationRef.current.isReady()) {
        navigationRef.current.reset({
            index: 0,
            routes: [{name}]
        });
    }
}

// add other navigation functions that you need and export them