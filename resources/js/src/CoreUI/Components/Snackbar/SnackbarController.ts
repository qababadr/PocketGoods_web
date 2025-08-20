import { defineStore } from "pinia";
import { Component, shallowRef } from "vue";
import { SnackbarPosition } from "./SnackbarPosition";
import { SnackbarSeverity } from "./SnackbarSeverity";
import DefaultComponent from "./DefaultComponent.vue";

type SnackbarControllerStoreState = {
    isVisible: boolean;
    content: Component;
    position?: SnackbarPosition | undefined;
    autoHideDuration?: number | undefined;
    elevation?: number | undefined;
    vertical?: boolean | undefined;
    severity?: SnackbarSeverity | undefined;
    contentProps?: Object;
};

export const useSnackbarControllerStore = defineStore(
    "SnackbarControllerStore",
    {
        state: (): SnackbarControllerStoreState => {
            return {
                isVisible: false,
                autoHideDuration: 3000,
                severity: SnackbarSeverity.Info,
                elevation: 24,
                vertical: false,
                position: SnackbarPosition.BottomRight,
                content: shallowRef(DefaultComponent),
            };
        },
        getters: {},
        actions: {
            show(params?: { onShow?: () => void }) {
                this.isVisible = true;
                if (params?.onShow) {
                    params.onShow();
                }
            },
            hide() {
                this.isVisible = false;
            },
            setAutoHideDuration(duration: number) {
                this.autoHideDuration = duration;
                return this;
            },
            setSeverity(type: SnackbarSeverity) {
                this.severity = type;
                return this;
            },
            setElevation(elevation: number) {
                this.elevation = elevation;
                return this;
            },
            setVertical(vertical: boolean) {
                this.vertical = vertical;
                return this;
            },
            setPosition(position: SnackbarPosition) {
                this.position = position;
            },
            setContent(content: Component) {
                this.content = shallowRef(content);
                return this;
            },
            setContentProps(props: Object) {
                this.contentProps = props;
                return this;
            },
        },
    }
);
