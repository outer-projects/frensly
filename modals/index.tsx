import { observer } from 'mobx-react';
import { useInjection } from 'inversify-react';
import { ModalStore } from '../stores/ModalStore';
import { ZoneModal } from './ZoneModal';


export enum ModalsEnum {
    Zone,

}

const MODAL_REGISTRY = {
    [ModalsEnum.Zone]:ZoneModal,

};

export const ModalsContainer = observer(() => {
    const modalStore = useInjection(ModalStore);

    return (
        <>
            {modalStore.activeModals.map((m, i) => {
                    // @ts-ignore
                    const Component = MODAL_REGISTRY[m.key];
                    return (
                            <Component key={i} data={m.data} idx={i} />
                    )
                })}
        </>
    );
});
