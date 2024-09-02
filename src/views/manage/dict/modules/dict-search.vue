<script setup lang="ts">
import { computed } from 'vue';
import { $t } from '@/locales';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { enableStatusOptions } from '@/constants/business';
import { translateOptions } from '@/utils/common';

defineOptions({
  name: 'DictSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, restoreValidation } = useNaiveForm();

const model = defineModel<Api.SystemManage.DictSearchParams>('model', { required: true });

type RuleKey = Extract<keyof Api.SystemManage.DictSearchParams, 'userEmail' | 'userPhone'>;

const rules = computed<Record<RuleKey, App.Global.FormRule>>(() => {
  const { patternRules } = useFormRules(); // inside computed to make locale reactive

  return {
    userEmail: patternRules.email,
    userPhone: patternRules.phone
  };
});

async function reset() {
  await restoreValidation();
  emit('reset');
}

async function search() {
  await validate();
  emit('search');
}
</script>

<template>
  <NCard :title="$t('common.search')" :bordered="false" size="small" class="card-wrapper">
    <NForm ref="formRef" :model="model" :rules="rules" label-placement="left" :label-width="80">
      <NGrid responsive="screen" item-responsive>
        <NFormItemGi span="12" :label="$t('page.manage.dict.dictName')" path="dictName">
          <NInput v-model:value="model.dictName" :placeholder="$t('page.manage.dict.form.dictName')" />
        </NFormItemGi>
        <NFormItemGi span="12" :label="$t('page.manage.dict.dictCode')" path="dictCode">
          <NInput v-model:value="model.dictCode" :placeholder="$t('page.manage.dict.form.dictCode')" />
        </NFormItemGi>
        <NFormItemGi span="12" :label="$t('page.manage.dict.status')" path="status">
          <NSelect
            v-model:value="model.status"
            :placeholder="$t('page.manage.dict.form.status')"
            :options="translateOptions(enableStatusOptions)"
            clearable
          />
        </NFormItemGi>
        <NFormItemGi span="12">
          <NSpace class="w-full" justify="end">
            <NButton @click="reset">
              <template #icon>
                <icon-ic-round-refresh class="text-icon" />
              </template>
              {{ $t('common.reset') }}
            </NButton>
            <NButton type="primary" ghost @click="search">
              <template #icon>
                <icon-ic-round-search class="text-icon" />
              </template>
              {{ $t('common.search') }}
            </NButton>
          </NSpace>
        </NFormItemGi>
      </NGrid>
    </NForm>
  </NCard>
</template>

<style scoped></style>
