<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
// import { fetchAddUser, fetchEditUser } from '@/service/api';
import { $t } from '@/locales';
import { enableStatusOptions } from '@/constants/business';

defineOptions({
  name: 'DictOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.SystemManage.Dict | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: $t('page.manage.dict.addDict'),
    edit: $t('page.manage.dict.editDict')
  };
  return titles[props.operateType];
});

type Model = Pick<Api.SystemManage.Dict, 'dictName' | 'dictCode' | 'dictDesc' | 'sort' | 'status'>;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    dictName: '',
    dictCode: '',
    dictDesc: '',
    sort: 0,
    status: null
  };
}

type RuleKey = Extract<keyof Model, 'dictName' | 'status'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  dictName: defaultRequiredRule,
  status: defaultRequiredRule
};

function handleInitModel() {
  Object.assign(model, createDefaultModel());

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();

  // if (props.operateType === 'add') {
  //   // add
  //   const { error } = await fetchAddUser(model);
  //   if (error) return;
  // } else {
  //   // edit
  //   const { error } = await fetchEditUser(props.rowData?.id as number, model);
  //   if (error) return;
  // }

  // request
  window.$message?.success($t('common.updateSuccess'));
  closeDrawer();
  emit('submitted');
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" :width="360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem :label="$t('page.manage.dict.dictName')" path="dictName">
          <NInput v-model:value="model.dictName" :placeholder="$t('page.manage.dict.form.dictName')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.dict.dictCode')" path="dictCode">
          <NInput v-model:value="model.dictCode" :placeholder="$t('page.manage.dict.form.dictCode')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.dict.dictDesc')" path="dictDesc">
          <NInput v-model:value="model.dictDesc" :placeholder="$t('page.manage.dict.form.dictDesc')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.dict.dictStatus')" path="status">
          <NRadioGroup v-model:value="model.status">
            <NRadio v-for="item in enableStatusOptions" :key="item.value" :value="item.value" :label="$t(item.label)" />
          </NRadioGroup>
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
