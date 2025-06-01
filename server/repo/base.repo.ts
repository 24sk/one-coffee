import type { SupabaseClient } from '@supabase/supabase-js';
import { Database, TableInsert, TableRow, TableUpdate } from '~/types';

export abstract class BaseRepository<
  TableName extends keyof Database['public']['Tables'],
  IdField extends keyof TableRow<TableName> = 'id',
> {
  protected abstract readonly tableName: TableName;
  protected readonly idField: IdField;

  constructor(
    protected readonly client: SupabaseClient<Database>,
    idField: IdField = 'id' as IdField
  ) {
    this.idField = idField;
  }

  async insert(data: TableInsert<TableName>) {
    const { error } = await this.client.from(this.tableName).insert(data as any);
    if (error) throw new Error(`${String(this.tableName)} insert failed: ${error.message}`);
  }

  async update(id: TableRow<TableName>[IdField], data: TableUpdate<TableName>) {
    const { error } = await this.client
      .from(this.tableName)
      .update(data as any)
      .eq(this.idField as string, id as any);
    if (error) throw new Error(`${String(this.tableName)} update failed: ${error.message}`);
  }

  async findById(id: TableRow<TableName>[IdField]): Promise<TableRow<TableName> | null> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select('*')
      .eq(this.idField as string, id as any)
      .maybeSingle();
    if (error) throw new Error(`${String(this.tableName)} find failed: ${error.message}`);
    return data as TableRow<TableName> | null;
  }

  async delete(id: TableRow<TableName>[IdField]) {
    const { error } = await this.client
      .from(this.tableName)
      .delete()
      .eq(this.idField as string, id as any);
    if (error) throw new Error(`${String(this.tableName)} delete failed: ${error.message}`);
  }
}
