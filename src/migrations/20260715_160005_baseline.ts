import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_case_studies_blocks_para_variant" AS ENUM('body', 'lead');
  CREATE TYPE "public"."enum_case_studies_blocks_image_aspect" AS ENUM('square', 'video');
  CREATE TYPE "public"."enum_case_studies_blocks_container_cols" AS ENUM('1', '2', '3');
  CREATE TYPE "public"."enum_case_studies_blocks_section_variant" AS ENUM('default', 'dim', 'inverted');
  CREATE TYPE "public"."enum_case_studies_blocks_section_layout" AS ENUM('standard', 'full-width');
  CREATE TYPE "public"."enum_case_studies_category" AS ENUM('build', 'rebuild', 'integration', 'frontend');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "blogs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"excerpt" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"cover_id" integer,
  	"featured" boolean DEFAULT false,
  	"published_date" timestamp(3) with time zone NOT NULL,
  	"updated_date" timestamp(3) with time zone,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "blogs_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "case_studies_blocks_para" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"src" varchar NOT NULL,
  	"variant" "enum_case_studies_blocks_para_variant" DEFAULT 'body',
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_blocks_numbered_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_blocks_bullet_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_blocks_eyebrow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"src" varchar NOT NULL,
  	"icon" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_blocks_h3" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"src" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_blocks_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"src" varchar NOT NULL,
  	"language" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"alt" varchar NOT NULL,
  	"aspect" "enum_case_studies_blocks_image_aspect",
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_blocks_simple_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"chip" varchar,
  	"title" varchar NOT NULL,
  	"desc" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_blocks_chip_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_blocks_stat" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_blocks_signature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"image_id" integer,
  	"image_alt" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_blocks_container" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cols" "enum_case_studies_blocks_container_cols" DEFAULT '1',
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies_blocks_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_title" varchar NOT NULL,
  	"title" varchar,
  	"variant" "enum_case_studies_blocks_section_variant" DEFAULT 'default',
  	"layout" "enum_case_studies_blocks_section_layout" DEFAULT 'standard',
  	"block_name" varchar
  );
  
  CREATE TABLE "case_studies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"client" varchar,
  	"category" "enum_case_studies_category" NOT NULL,
  	"role" varchar NOT NULL,
  	"timeframe_start" timestamp(3) with time zone NOT NULL,
  	"timeframe_end" timestamp(3) with time zone,
  	"cover_image_id" integer,
  	"featured" boolean DEFAULT false,
  	"order" numeric,
  	"links_github" varchar,
  	"links_live" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "case_studies_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "experience" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company" varchar NOT NULL,
  	"position" varchar NOT NULL,
  	"website" varchar NOT NULL,
  	"timeframe_start" timestamp(3) with time zone NOT NULL,
  	"timeframe_end" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "experience_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "payload_mcp_api_keys" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"label" varchar,
  	"description" varchar,
  	"blogs_find" boolean DEFAULT false,
  	"blogs_create" boolean DEFAULT false,
  	"blogs_update" boolean DEFAULT false,
  	"blogs_delete" boolean DEFAULT false,
  	"case_studies_find" boolean DEFAULT false,
  	"case_studies_create" boolean DEFAULT false,
  	"case_studies_update" boolean DEFAULT false,
  	"case_studies_delete" boolean DEFAULT false,
  	"experience_find" boolean DEFAULT false,
  	"experience_create" boolean DEFAULT false,
  	"experience_update" boolean DEFAULT false,
  	"experience_delete" boolean DEFAULT false,
  	"media_find" boolean DEFAULT false,
  	"media_create" boolean DEFAULT false,
  	"media_update" boolean DEFAULT false,
  	"media_delete" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"enable_a_p_i_key" boolean,
  	"api_key" varchar,
  	"api_key_index" varchar
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"blogs_id" integer,
  	"case_studies_id" integer,
  	"experience_id" integer,
  	"payload_mcp_api_keys_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"payload_mcp_api_keys_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs" ADD CONSTRAINT "blogs_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blogs_texts" ADD CONSTRAINT "blogs_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_para" ADD CONSTRAINT "case_studies_blocks_para_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_numbered_list" ADD CONSTRAINT "case_studies_blocks_numbered_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_bullet_list" ADD CONSTRAINT "case_studies_blocks_bullet_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_eyebrow" ADD CONSTRAINT "case_studies_blocks_eyebrow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_h3" ADD CONSTRAINT "case_studies_blocks_h3_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_code" ADD CONSTRAINT "case_studies_blocks_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_image" ADD CONSTRAINT "case_studies_blocks_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_image" ADD CONSTRAINT "case_studies_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_simple_card" ADD CONSTRAINT "case_studies_blocks_simple_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_chip_list" ADD CONSTRAINT "case_studies_blocks_chip_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_stat" ADD CONSTRAINT "case_studies_blocks_stat_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_signature" ADD CONSTRAINT "case_studies_blocks_signature_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_signature" ADD CONSTRAINT "case_studies_blocks_signature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_container" ADD CONSTRAINT "case_studies_blocks_container_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies_blocks_section" ADD CONSTRAINT "case_studies_blocks_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "case_studies_texts" ADD CONSTRAINT "case_studies_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experience_texts" ADD CONSTRAINT "experience_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_mcp_api_keys" ADD CONSTRAINT "payload_mcp_api_keys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blogs_fk" FOREIGN KEY ("blogs_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_case_studies_fk" FOREIGN KEY ("case_studies_id") REFERENCES "public"."case_studies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_experience_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_mcp_api_keys_fk" FOREIGN KEY ("payload_mcp_api_keys_id") REFERENCES "public"."payload_mcp_api_keys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_payload_mcp_api_keys_fk" FOREIGN KEY ("payload_mcp_api_keys_id") REFERENCES "public"."payload_mcp_api_keys"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "blogs_slug_idx" ON "blogs" USING btree ("slug");
  CREATE INDEX "blogs_cover_idx" ON "blogs" USING btree ("cover_id");
  CREATE INDEX "blogs_seo_seo_og_image_idx" ON "blogs" USING btree ("seo_og_image_id");
  CREATE INDEX "blogs_updated_at_idx" ON "blogs" USING btree ("updated_at");
  CREATE INDEX "blogs_created_at_idx" ON "blogs" USING btree ("created_at");
  CREATE INDEX "blogs_texts_order_parent" ON "blogs_texts" USING btree ("order","parent_id");
  CREATE INDEX "case_studies_blocks_para_order_idx" ON "case_studies_blocks_para" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_para_parent_id_idx" ON "case_studies_blocks_para" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_para_path_idx" ON "case_studies_blocks_para" USING btree ("_path");
  CREATE INDEX "case_studies_blocks_numbered_list_order_idx" ON "case_studies_blocks_numbered_list" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_numbered_list_parent_id_idx" ON "case_studies_blocks_numbered_list" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_numbered_list_path_idx" ON "case_studies_blocks_numbered_list" USING btree ("_path");
  CREATE INDEX "case_studies_blocks_bullet_list_order_idx" ON "case_studies_blocks_bullet_list" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_bullet_list_parent_id_idx" ON "case_studies_blocks_bullet_list" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_bullet_list_path_idx" ON "case_studies_blocks_bullet_list" USING btree ("_path");
  CREATE INDEX "case_studies_blocks_eyebrow_order_idx" ON "case_studies_blocks_eyebrow" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_eyebrow_parent_id_idx" ON "case_studies_blocks_eyebrow" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_eyebrow_path_idx" ON "case_studies_blocks_eyebrow" USING btree ("_path");
  CREATE INDEX "case_studies_blocks_h3_order_idx" ON "case_studies_blocks_h3" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_h3_parent_id_idx" ON "case_studies_blocks_h3" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_h3_path_idx" ON "case_studies_blocks_h3" USING btree ("_path");
  CREATE INDEX "case_studies_blocks_code_order_idx" ON "case_studies_blocks_code" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_code_parent_id_idx" ON "case_studies_blocks_code" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_code_path_idx" ON "case_studies_blocks_code" USING btree ("_path");
  CREATE INDEX "case_studies_blocks_image_order_idx" ON "case_studies_blocks_image" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_image_parent_id_idx" ON "case_studies_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_image_path_idx" ON "case_studies_blocks_image" USING btree ("_path");
  CREATE INDEX "case_studies_blocks_image_image_idx" ON "case_studies_blocks_image" USING btree ("image_id");
  CREATE INDEX "case_studies_blocks_simple_card_order_idx" ON "case_studies_blocks_simple_card" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_simple_card_parent_id_idx" ON "case_studies_blocks_simple_card" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_simple_card_path_idx" ON "case_studies_blocks_simple_card" USING btree ("_path");
  CREATE INDEX "case_studies_blocks_chip_list_order_idx" ON "case_studies_blocks_chip_list" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_chip_list_parent_id_idx" ON "case_studies_blocks_chip_list" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_chip_list_path_idx" ON "case_studies_blocks_chip_list" USING btree ("_path");
  CREATE INDEX "case_studies_blocks_stat_order_idx" ON "case_studies_blocks_stat" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_stat_parent_id_idx" ON "case_studies_blocks_stat" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_stat_path_idx" ON "case_studies_blocks_stat" USING btree ("_path");
  CREATE INDEX "case_studies_blocks_signature_order_idx" ON "case_studies_blocks_signature" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_signature_parent_id_idx" ON "case_studies_blocks_signature" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_signature_path_idx" ON "case_studies_blocks_signature" USING btree ("_path");
  CREATE INDEX "case_studies_blocks_signature_image_idx" ON "case_studies_blocks_signature" USING btree ("image_id");
  CREATE INDEX "case_studies_blocks_container_order_idx" ON "case_studies_blocks_container" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_container_parent_id_idx" ON "case_studies_blocks_container" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_container_path_idx" ON "case_studies_blocks_container" USING btree ("_path");
  CREATE INDEX "case_studies_blocks_section_order_idx" ON "case_studies_blocks_section" USING btree ("_order");
  CREATE INDEX "case_studies_blocks_section_parent_id_idx" ON "case_studies_blocks_section" USING btree ("_parent_id");
  CREATE INDEX "case_studies_blocks_section_path_idx" ON "case_studies_blocks_section" USING btree ("_path");
  CREATE UNIQUE INDEX "case_studies_slug_idx" ON "case_studies" USING btree ("slug");
  CREATE INDEX "case_studies_cover_image_idx" ON "case_studies" USING btree ("cover_image_id");
  CREATE INDEX "case_studies_seo_seo_og_image_idx" ON "case_studies" USING btree ("seo_og_image_id");
  CREATE INDEX "case_studies_updated_at_idx" ON "case_studies" USING btree ("updated_at");
  CREATE INDEX "case_studies_created_at_idx" ON "case_studies" USING btree ("created_at");
  CREATE INDEX "case_studies_texts_order_parent" ON "case_studies_texts" USING btree ("order","parent_id");
  CREATE INDEX "experience_updated_at_idx" ON "experience" USING btree ("updated_at");
  CREATE INDEX "experience_created_at_idx" ON "experience" USING btree ("created_at");
  CREATE INDEX "experience_texts_order_parent" ON "experience_texts" USING btree ("order","parent_id");
  CREATE INDEX "payload_mcp_api_keys_user_idx" ON "payload_mcp_api_keys" USING btree ("user_id");
  CREATE INDEX "payload_mcp_api_keys_updated_at_idx" ON "payload_mcp_api_keys" USING btree ("updated_at");
  CREATE INDEX "payload_mcp_api_keys_created_at_idx" ON "payload_mcp_api_keys" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_blogs_id_idx" ON "payload_locked_documents_rels" USING btree ("blogs_id");
  CREATE INDEX "payload_locked_documents_rels_case_studies_id_idx" ON "payload_locked_documents_rels" USING btree ("case_studies_id");
  CREATE INDEX "payload_locked_documents_rels_experience_id_idx" ON "payload_locked_documents_rels" USING btree ("experience_id");
  CREATE INDEX "payload_locked_documents_rels_payload_mcp_api_keys_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_mcp_api_keys_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_rels_payload_mcp_api_keys_id_idx" ON "payload_preferences_rels" USING btree ("payload_mcp_api_keys_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "blogs" CASCADE;
  DROP TABLE "blogs_texts" CASCADE;
  DROP TABLE "case_studies_blocks_para" CASCADE;
  DROP TABLE "case_studies_blocks_numbered_list" CASCADE;
  DROP TABLE "case_studies_blocks_bullet_list" CASCADE;
  DROP TABLE "case_studies_blocks_eyebrow" CASCADE;
  DROP TABLE "case_studies_blocks_h3" CASCADE;
  DROP TABLE "case_studies_blocks_code" CASCADE;
  DROP TABLE "case_studies_blocks_image" CASCADE;
  DROP TABLE "case_studies_blocks_simple_card" CASCADE;
  DROP TABLE "case_studies_blocks_chip_list" CASCADE;
  DROP TABLE "case_studies_blocks_stat" CASCADE;
  DROP TABLE "case_studies_blocks_signature" CASCADE;
  DROP TABLE "case_studies_blocks_container" CASCADE;
  DROP TABLE "case_studies_blocks_section" CASCADE;
  DROP TABLE "case_studies" CASCADE;
  DROP TABLE "case_studies_texts" CASCADE;
  DROP TABLE "experience" CASCADE;
  DROP TABLE "experience_texts" CASCADE;
  DROP TABLE "payload_mcp_api_keys" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_case_studies_blocks_para_variant";
  DROP TYPE "public"."enum_case_studies_blocks_image_aspect";
  DROP TYPE "public"."enum_case_studies_blocks_container_cols";
  DROP TYPE "public"."enum_case_studies_blocks_section_variant";
  DROP TYPE "public"."enum_case_studies_blocks_section_layout";
  DROP TYPE "public"."enum_case_studies_category";`);
}
