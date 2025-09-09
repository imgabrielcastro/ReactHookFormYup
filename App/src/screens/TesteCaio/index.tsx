import {
    FitButton,
    FitHStack,
    FitIconAwesome,
    FitText,
    FitTextCustomWeight,
    FitTextInput,
    FitVStack,
    useAppTheme,
} from '@nextfit/mobile-ui';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, ScrollView, StatusBar, View } from 'react-native';
import FitIconButton from '../../../../../components/nativeBase/buttons/FitIconButton';
import { faChevronLeft, faCircleCheck, faCircleQuestion } from '@fortawesome/pro-regular-svg-icons';
import { IS_IOS } from '../../../../../infra/constants/sistema';
import FitTextInputCpfMask from '../../../../../components/libBaseComponents/Inputs/FitTextInputCpfMask';
import FitDatePicker from '../../../../../components/libBaseComponents/Inputs/FitDatePicker';
import { useEffect, useRef, useState } from 'react';
import TelaBaseSemHeader from '../../../components/TelaBaseSemHeader';
import ModalExplicacaoConfirmarDados from './components/ModalExplicacaoConfirmarDados';
import { IFitBottomSheetModalRef } from '../../../../../components/nativeBase/FitBottomSheetModal';
import ModalDefinirSenha from './components/ModalDefinirSenha';
import ModalAtualizarDados from './components/ModalAtualizarDados';
import ModalSemHistoricoFinanceiro from './components/ModalSemHistoricoFinanceiro';
import {
    EnumAcaoPermitidaUsuarioHealthHub,
    EnumMotivoRecusaAcessoHealthHub,
} from '../../../../../infra/enums/EnumHealthHub/EnumUnificacaoContas';
import { IDadosParaAcessoHealthHub, IParamsInserirUsuarioHealthHub } from '../../../../../services/healthHub/usuario';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { confirmarDadosGeraisSchema } from './schema';
import FitTextInputFoneMask from '../../../../../components/libBaseComponents/Inputs/FitTextInputFoneMask';

interface IConfirmarDadosGeraisHealthHubRouteParams {
    motivoRecusaAcesso: EnumMotivoRecusaAcessoHealthHub;
    acaoPermitida: EnumAcaoPermitidaUsuarioHealthHub;
    dadosParaAcessoHealthHub: IDadosParaAcessoHealthHub;
}

const ConfirmarDadosGeraisHealthHub = (props: any) => {
    const { motivoRecusaAcesso, acaoPermitida, dadosParaAcessoHealthHub }: IConfirmarDadosGeraisHealthHubRouteParams =
        props?.route?.params || {};

    const { colors } = useAppTheme();
    const isFocused = useIsFocused();
    const navigation = useNavigation<any>();

    const [formUsuario, setFormUsuario] = useState<IParamsInserirUsuarioHealthHub>();

    const modalExplicacaoConfirmarRef = useRef<IFitBottomSheetModalRef>(undefined);
    const modalDefinirSenhaRef = useRef<IFitBottomSheetModalRef>(undefined);
    const modalAtualizarDadosRef = useRef<IFitBottomSheetModalRef>(undefined);
    const modalSemHistoricoFinanceiroRef = useRef<IFitBottomSheetModalRef>(undefined);

    const naoPodeAcessar = acaoPermitida === EnumAcaoPermitidaUsuarioHealthHub.NENHUMA;
    const semHistoricoFinanceiro =
        motivoRecusaAcesso === EnumMotivoRecusaAcessoHealthHub.CADASTRO_SEM_VINCULO_COMERCIAL;
    const semCpf = motivoRecusaAcesso === EnumMotivoRecusaAcessoHealthHub.CADASTRO_SEM_CPF;
    const semContatoVerificado = motivoRecusaAcesso === EnumMotivoRecusaAcessoHealthHub.CADASTRO_SEM_CONTATO_VERIFICADO;
    const { unidade, cpf, dataNascimento, email, fone, dddFone, nome, possuiFoneVerificado, possuiEmailVerificado } =
        dadosParaAcessoHealthHub;
    const { fantasia } = unidade;

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            nome: nome ?? '',
            cpf: cpf ?? '',
            dataNascimento: dataNascimento ?? null,
            fone: dddFone && fone ? `(${dddFone}) ${fone}` : fone ?? '',
            email: email ?? '',
        },
        resolver: yupResolver(confirmarDadosGeraisSchema),
    });

    useEffect(() => {
        handleVerificarMotivoRecusaAcesso();
    }, []);

    const handleOnPressProximo = () => {
        const permiteContinuar = handleVerificarMotivoRecusaAcesso();
        if (!permiteContinuar) return;
        handleSubmit(onSubmit)();
    };

    const handleVerificarMotivoRecusaAcesso = () => {
        if (naoPodeAcessar && semHistoricoFinanceiro) {
            modalSemHistoricoFinanceiroRef?.current?.open();
            return false;
        }

        if (naoPodeAcessar && (semCpf || semContatoVerificado)) {
            modalAtualizarDadosRef?.current?.open();
            return false;
        }

        return true;
    };

    const onSubmit = (data: any) => {
        const cleaned = data.fone.replace(/\D/g, '');
        const dddFone = cleaned.slice(0, 2);
        const foneSemDdd = cleaned.slice(2);
        const fusoHorarioIana = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const payload: IParamsInserirUsuarioHealthHub = {
            ...data,
            taxId: data.cpf,
            dddFone,
            fone: foneSemDdd,
            fusoHorarioIana,
            dataNascimento: data.dataNascimento.toISOString(),
        };
        setFormUsuario(payload);

        modalDefinirSenhaRef?.current?.open();
    };

    const renderRightContentInput = (isVerificado: boolean) =>
        isVerificado ? <FitIconAwesome icon={faCircleCheck} size={18} color={colors.gray400} /> : null;

    const stringDescricao = `Resgatamos suas informações do Next Fit para o Health Hub. Basta confirmar e seguir. O seu acesso à *${fantasia}* continua igual.`;

    return (
        <TelaBaseSemHeader>
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: colors.gray50 }}
                behavior={IS_IOS ? 'padding' : 'height'}
                keyboardVerticalOffset={IS_IOS ? 80 : 20}
            >
                <View style={{ flex: 1, backgroundColor: colors.gray50 }}>
                    {isFocused && <StatusBar animated backgroundColor={colors.gray50} barStyle='dark-content' />}

                    <View style={{ alignSelf: 'flex-start', paddingLeft: 8, marginTop: 8 }}>
                        <FitIconButton
                            onPress={() => navigation.goBack()}
                            icon={<FitIconAwesome icon={faChevronLeft} size={20} color={colors.gray700} />}
                        />
                    </View>

                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={{
                            paddingHorizontal: 16,
                            paddingTop: 8,
                        }}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps='handled'
                    >
                        <FitVStack rowGap={6}>
                            <FitVStack rowGap={2} style={{ maxWidth: '95%' }}>
                                <FitHStack alignItems='center' columnGap={1}>
                                    <FitText variant='h5'>Confirme seus dados</FitText>
                                    <FitIconButton
                                        onPress={() => modalExplicacaoConfirmarRef?.current?.open()}
                                        icon={
                                            <FitIconAwesome icon={faCircleQuestion} size={20} color={colors.gray700} />
                                        }
                                    />
                                </FitHStack>
                                <FitTextCustomWeight variant='body1' numberOfLines={10}>
                                    {stringDescricao}
                                </FitTextCustomWeight>
                            </FitVStack>

                            <View>
                                <Controller
                                    control={control}
                                    name='nome'
                                    render={({ field: { onChange, value } }) => (
                                        <FitTextInput
                                            label='Nome *'
                                            value={value}
                                            onChangeText={onChange}
                                            error={!!errors.nome}
                                            errorText={errors.nome?.message}
                                        />
                                    )}
                                />
                            </View>

                            <View>
                                <Controller
                                    control={control}
                                    name='cpf'
                                    render={({ field: { onChange, value } }) => (
                                        <FitTextInputCpfMask
                                            label='CPF *'
                                            disabled
                                            value={value}
                                            onChangeText={onChange}
                                            error={!!errors.cpf}
                                            errorText={errors.cpf?.message}
                                        />
                                    )}
                                />
                            </View>

                            <View>
                                <Controller
                                    control={control}
                                    name='dataNascimento'
                                    render={({ field: { onChange, value } }) => (
                                        <FitDatePicker
                                            label='Data de nascimento *'
                                            value={value}
                                            mode='date'
                                            onChange={onChange}
                                            error={!!errors.dataNascimento}
                                            errorText={errors.dataNascimento?.message}
                                        />
                                    )}
                                />
                            </View>

                            <View>
                                <Controller
                                    control={control}
                                    name='fone'
                                    render={({ field: { onChange, value } }) => (
                                        <FitTextInputFoneMask
                                            label='Celular *'
                                            value={value}
                                            disabled={possuiFoneVerificado}
                                            onChangeText={onChange}
                                            errorText={errors.fone?.message}
                                            rightContent={renderRightContentInput(possuiFoneVerificado)}
                                        />
                                    )}
                                />
                            </View>

                            <View>
                                <Controller
                                    control={control}
                                    name='email'
                                    render={({ field: { onChange, value } }) => (
                                        <FitTextInput
                                            label='Email *'
                                            value={value}
                                            disabled={possuiEmailVerificado}
                                            onChangeText={onChange}
                                            error={!!errors.email}
                                            errorText={errors.email?.message}
                                            rightContent={renderRightContentInput(possuiEmailVerificado)}
                                        />
                                    )}
                                />
                            </View>
                        </FitVStack>
                    </ScrollView>

                    <View style={{ padding: 16 }}>
                        <FitButton buttonSize='xl' onPress={handleOnPressProximo}>
                            Próximo
                        </FitButton>
                    </View>
                </View>
            </KeyboardAvoidingView>
            <ModalExplicacaoConfirmarDados modalRef={modalExplicacaoConfirmarRef} />
            <ModalAtualizarDados modalRef={modalAtualizarDadosRef} />
            <ModalDefinirSenha nomeFantasia={fantasia} formUsuario={formUsuario} modalRef={modalDefinirSenhaRef} />
            <ModalSemHistoricoFinanceiro nomeFantasia={fantasia} modalRef={modalSemHistoricoFinanceiroRef} />
        </TelaBaseSemHeader>
    );
};

export default ConfirmarDadosGeraisHealthHub;
