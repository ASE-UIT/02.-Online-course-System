--
-- PostgreSQL database dump
--

-- Dumped from database version 15.7 (Debian 15.7-1.pgdg120+1)
-- Dumped by pg_dump version 15.8 (Debian 15.8-0+deb12u1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.courses DROP CONSTRAINT "FK_e4c260fe6bb1131707c4617f745";
ALTER TABLE ONLY public.orders_items DROP CONSTRAINT "FK_e126fa247324af30621e1cb8335";
ALTER TABLE ONLY public.course_keys DROP CONSTRAINT "FK_e014bd90ac6e913fbca39122e3a";
ALTER TABLE ONLY public.discounts DROP CONSTRAINT "FK_c15fc9837677fa4214aa7de3b82";
ALTER TABLE ONLY public.enrollments DROP CONSTRAINT "FK_b79d0bf01779fdf9cfb6b092af3";
ALTER TABLE ONLY public.student_complete_quizzes DROP CONSTRAINT "FK_a63fd390a26b35cbea81410bab7";
ALTER TABLE ONLY public.student_complete_lessons DROP CONSTRAINT "FK_968b667f67d5503144a7b364f59";
ALTER TABLE ONLY public.lesson_parts DROP CONSTRAINT "FK_8d1aa6f6e5e12cd5e1423532b4c";
ALTER TABLE ONLY public.cart_items DROP CONSTRAINT "FK_82206f0c18875a8d46fb35182d6";
ALTER TABLE ONLY public.roles_permissions DROP CONSTRAINT "FK_7d2dad9f14eddeb09c256fea719";
ALTER TABLE ONLY public.employees DROP CONSTRAINT "FK_727d9c30d77d3a253177b2e918f";
ALTER TABLE ONLY public.orders DROP CONSTRAINT "FK_6c846a094b1989e1a202558803b";
ALTER TABLE ONLY public.courses DROP CONSTRAINT "FK_667f9ddd37aab68ff127dca9de2";
ALTER TABLE ONLY public.cart_items DROP CONSTRAINT "FK_6385a745d9e12a89b859bb25623";
ALTER TABLE ONLY public.orders DROP CONSTRAINT "FK_5b3e94bd2aedc184f9ad8c10439";
ALTER TABLE ONLY public.orders_items DROP CONSTRAINT "FK_53c21b56c3eebe5cd88525ccd6e";
ALTER TABLE ONLY public.quizzes DROP CONSTRAINT "FK_5322dcee0b05335d74a46b72cfc";
ALTER TABLE ONLY public.course_ratings DROP CONSTRAINT "FK_4a29f927ecdb55acc334e8dae1d";
ALTER TABLE ONLY public.lecturers DROP CONSTRAINT "FK_462d85d7909b9669351df2276ed";
ALTER TABLE ONLY public.student_complete_lessons DROP CONSTRAINT "FK_430643a97b173fcfc68401882ea";
ALTER TABLE ONLY public.orders_items DROP CONSTRAINT "FK_3484e73ecd5e701e72db44294c5";
ALTER TABLE ONLY public.roles_permissions DROP CONSTRAINT "FK_337aa8dba227a1fe6b73998307b";
ALTER TABLE ONLY public.course_ratings DROP CONSTRAINT "FK_32b68ae69d8fb9200a854d6b331";
ALTER TABLE ONLY public.students DROP CONSTRAINT "FK_324b2737f793bd3403f922c31d8";
ALTER TABLE ONLY public.enrollments DROP CONSTRAINT "FK_307813fe255896d6ebf3e6cd55c";
ALTER TABLE ONLY public.course_keys DROP CONSTRAINT "FK_222889c2e1957518186984d9b85";
ALTER TABLE ONLY public.lessons DROP CONSTRAINT "FK_1a31f0838f4afc7f678e011873f";
ALTER TABLE ONLY public.student_complete_quizzes DROP CONSTRAINT "FK_14ad7445b0382149f633806b8b9";
ALTER TABLE ONLY public.carts DROP CONSTRAINT "FK_0a8f2564b9524637d2bd0fca0cb";
ALTER TABLE ONLY public.employees DROP CONSTRAINT "UQ_765bc1ac8967533a04c74a9f6af";
ALTER TABLE ONLY public.orders DROP CONSTRAINT "UQ_5b3e94bd2aedc184f9ad8c10439";
ALTER TABLE ONLY public.lecturers DROP CONSTRAINT "UQ_59e50bc884350d532a8db289aa8";
ALTER TABLE ONLY public.lecturers DROP CONSTRAINT "UQ_3bf0b8dac54e0e07b5c3078f52d";
ALTER TABLE ONLY public.carts DROP CONSTRAINT "UQ_0a8f2564b9524637d2bd0fca0cb";
ALTER TABLE ONLY public.employees DROP CONSTRAINT "UQ_027a331b2053bb37f39fb2704fb";
ALTER TABLE ONLY public.student_complete_lessons DROP CONSTRAINT "PK_ff7c717edb49aa98faa61f32ee5";
ALTER TABLE ONLY public.course_ratings DROP CONSTRAINT "PK_ea1fcdbcda76cdeb72ea8cf4530";
ALTER TABLE ONLY public.student_complete_quizzes DROP CONSTRAINT "PK_e04f3f30e5cbfa153fd61c1f0f0";
ALTER TABLE ONLY public.employees DROP CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4";
ALTER TABLE ONLY public.carts DROP CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816";
ALTER TABLE ONLY public.role DROP CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2";
ALTER TABLE ONLY public.quizzes DROP CONSTRAINT "PK_b24f0f7662cf6b3a0e7dba0a1b4";
ALTER TABLE ONLY public.course_keys DROP CONSTRAINT "PK_a4ee2bdeb1f01a7a75b65e9af2d";
ALTER TABLE ONLY public.lessons DROP CONSTRAINT "PK_9b9a8d455cac672d262d7275730";
ALTER TABLE ONLY public.permissions DROP CONSTRAINT "PK_920331560282b8bd21bb02290df";
ALTER TABLE ONLY public.migrations DROP CONSTRAINT "PK_8c82d7f526340ab734260ea46be";
ALTER TABLE ONLY public.enrollments DROP CONSTRAINT "PK_850389020f5faddd405e2792634";
ALTER TABLE ONLY public.students DROP CONSTRAINT "PK_7d7f07271ad4ce999880713f05e";
ALTER TABLE ONLY public.lesson_parts DROP CONSTRAINT "PK_7a720f7f225001dcb713c013cdd";
ALTER TABLE ONLY public.orders DROP CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f";
ALTER TABLE ONLY public.notification DROP CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7";
ALTER TABLE ONLY public.discounts DROP CONSTRAINT "PK_66c522004212dc814d6e2f14ecc";
ALTER TABLE ONLY public.course_categories DROP CONSTRAINT "PK_626794960514393da07e942f8d0";
ALTER TABLE ONLY public.account DROP CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea";
ALTER TABLE ONLY public.lecturers DROP CONSTRAINT "PK_4dffa0b38d36bfd09610d64b399";
ALTER TABLE ONLY public.cart_items DROP CONSTRAINT "PK_4c121e936f32192e817b50ae22a";
ALTER TABLE ONLY public.courses DROP CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9";
ALTER TABLE ONLY public.payments DROP CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59";
ALTER TABLE ONLY public.orders_items DROP CONSTRAINT "PK_0fd87b790d35ac255b17f6a3bd1";
ALTER TABLE ONLY public.roles_permissions DROP CONSTRAINT "PK_0cd11f0b35c4d348c6ebb9b36b7";
ALTER TABLE public.migrations ALTER COLUMN id DROP DEFAULT;
DROP TABLE public.test;
DROP TABLE public.students;
DROP TABLE public.student_complete_quizzes;
DROP TABLE public.student_complete_lessons;
DROP TABLE public.roles_permissions;
DROP TABLE public.role;
DROP TABLE public.quizzes;
DROP TABLE public.permissions;
DROP TABLE public.payments;
DROP TABLE public.orders_items;
DROP TABLE public.orders;
DROP TABLE public.notification;
DROP SEQUENCE public.migrations_id_seq;
DROP TABLE public.migrations;
DROP TABLE public.lessons;
DROP TABLE public.lesson_parts;
DROP TABLE public.lecturers;
DROP TABLE public.enrollments;
DROP TABLE public.employees;
DROP TABLE public.discounts;
DROP TABLE public.courses;
DROP TABLE public.course_ratings;
DROP TABLE public.course_keys;
DROP TABLE public.course_categories;
DROP TABLE public.carts;
DROP TABLE public.cart_items;
DROP TABLE public.account;
DROP TYPE public.orders_status_enum;
DROP TYPE public.notification_role_enum;
DROP TYPE public.enrollments_status_enum;
DROP TYPE public.courses_status_enum;
DROP TYPE public.courses_difficulty_level_enum;
DROP EXTENSION "uuid-ossp";
--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: courses_difficulty_level_enum; Type: TYPE; Schema: public; Owner: dev_account
--

CREATE TYPE public.courses_difficulty_level_enum AS ENUM (
    'easy',
    'medium',
    'hard'
);


ALTER TYPE public.courses_difficulty_level_enum OWNER TO dev_account;

--
-- Name: courses_status_enum; Type: TYPE; Schema: public; Owner: dev_account
--

CREATE TYPE public.courses_status_enum AS ENUM (
    'WAITING_FOR_APPROVAL',
    'PUBLISHED',
    'REJECTED'
);


ALTER TYPE public.courses_status_enum OWNER TO dev_account;

--
-- Name: enrollments_status_enum; Type: TYPE; Schema: public; Owner: dev_account
--

CREATE TYPE public.enrollments_status_enum AS ENUM (
    'active',
    'completed',
    'cancelled'
);


ALTER TYPE public.enrollments_status_enum OWNER TO dev_account;

--
-- Name: notification_role_enum; Type: TYPE; Schema: public; Owner: dev_account
--

CREATE TYPE public.notification_role_enum AS ENUM (
    'TECHNICAL_ADMIN',
    'HELP_DESK',
    'MANAGEMENT_ADMIN',
    'BLD',
    'CRM',
    'HRM',
    'ACCOUNTANT',
    'STUDENT',
    'LECTURER'
);


ALTER TYPE public.notification_role_enum OWNER TO dev_account;

--
-- Name: orders_status_enum; Type: TYPE; Schema: public; Owner: dev_account
--

CREATE TYPE public.orders_status_enum AS ENUM (
    'WAITING_FOR_PAYMENT',
    'CANCELED',
    'PAID',
    'FAILED'
);


ALTER TYPE public.orders_status_enum OWNER TO dev_account;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.account (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying(30) NOT NULL,
    password character varying(20) NOT NULL,
    fullname character varying(30) NOT NULL,
    address character varying(150) NOT NULL,
    phone_number character varying(15) NOT NULL,
    birthday date NOT NULL,
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.account OWNER TO dev_account;

--
-- Name: cart_items; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.cart_items (
    cart_id uuid NOT NULL,
    course_id uuid NOT NULL
);


ALTER TABLE public.cart_items OWNER TO dev_account;

--
-- Name: carts; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.carts (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    student_id uuid NOT NULL
);


ALTER TABLE public.carts OWNER TO dev_account;

--
-- Name: course_categories; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.course_categories (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(50) NOT NULL,
    description text,
    thumbnail text
);


ALTER TABLE public.course_categories OWNER TO dev_account;

--
-- Name: course_keys; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.course_keys (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    key uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    is_used boolean DEFAULT false NOT NULL,
    course_id uuid,
    order_id uuid
);


ALTER TABLE public.course_keys OWNER TO dev_account;

--
-- Name: course_ratings; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.course_ratings (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    course_id uuid NOT NULL,
    rating_point integer,
    comment character varying,
    student_id uuid NOT NULL,
    liked integer DEFAULT 0 NOT NULL,
    unliked integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.course_ratings OWNER TO dev_account;

--
-- Name: courses; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.courses (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(150),
    thumbnail text,
    duration numeric(10,1) DEFAULT '0'::numeric NOT NULL,
    difficulty_level public.courses_difficulty_level_enum DEFAULT 'easy'::public.courses_difficulty_level_enum NOT NULL,
    start_date date,
    end_date date,
    category_id uuid NOT NULL,
    lecturer_id uuid NOT NULL,
    is_approved boolean DEFAULT false NOT NULL,
    name_en character varying(150),
    original_price numeric DEFAULT '0'::numeric NOT NULL,
    sell_price numeric DEFAULT '0'::numeric NOT NULL,
    short_description text,
    introduction text,
    participants text,
    course_targets text,
    welcome_join character varying(100),
    video_sale text,
    course_materials text,
    lowest_price numeric,
    "socialGroupLink" character varying(100),
    "courseLink" character varying(100),
    tags text,
    is_free_course boolean DEFAULT false NOT NULL,
    start_free_date date,
    end_free_date date,
    status public.courses_status_enum DEFAULT 'WAITING_FOR_APPROVAL'::public.courses_status_enum NOT NULL,
    total_students integer DEFAULT 0 NOT NULL,
    total_reviews integer DEFAULT 0 NOT NULL,
    average_rating integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.courses OWNER TO dev_account;

--
-- Name: discounts; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.discounts (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    code character varying(150),
    discount_amount numeric,
    discount_percentage numeric,
    start_date date NOT NULL,
    end_date date NOT NULL,
    course_id character varying NOT NULL,
    "courseId" uuid
);


ALTER TABLE public.discounts OWNER TO dev_account;

--
-- Name: employees; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.employees (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(70),
    phone_number character varying(15),
    password character varying(150) NOT NULL,
    role_id character varying,
    avatar text
);


ALTER TABLE public.employees OWNER TO dev_account;

--
-- Name: enrollments; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.enrollments (
    enrolled_date date NOT NULL,
    status public.enrollments_status_enum NOT NULL,
    completion_percentage integer NOT NULL,
    completion_date date,
    student_id uuid NOT NULL,
    course_id uuid NOT NULL,
    certificate text
);


ALTER TABLE public.enrollments OWNER TO dev_account;

--
-- Name: lecturers; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.lecturers (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(70),
    phone_number character varying(15),
    address character varying(100) NOT NULL,
    bio text,
    password character varying(150) NOT NULL,
    role_id character varying,
    email_verified boolean DEFAULT false NOT NULL,
    is_approved boolean DEFAULT false NOT NULL,
    avatar text,
    short_description character varying(100),
    example_video text,
    social_link text,
    teaching_topic character varying(50),
    teaching_experience text
);


ALTER TABLE public.lecturers OWNER TO dev_account;

--
-- Name: lesson_parts; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.lesson_parts (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    part_no integer NOT NULL,
    part_name character varying(100) NOT NULL,
    course_id uuid
);


ALTER TABLE public.lesson_parts OWNER TO dev_account;

--
-- Name: lessons; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.lessons (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    description text,
    title character varying(150) NOT NULL,
    duration numeric(10,1) NOT NULL,
    "order" integer DEFAULT 1 NOT NULL,
    video_url text,
    resource_link text,
    lesson_part_id uuid,
    introduction text,
    is_free_trial boolean DEFAULT false NOT NULL
);


ALTER TABLE public.lessons OWNER TO dev_account;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO dev_account;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: dev_account
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO dev_account;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev_account
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: notification; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.notification (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    content text,
    title character varying(100),
    "isRead" boolean DEFAULT false NOT NULL,
    user_id character varying,
    role public.notification_role_enum DEFAULT 'STUDENT'::public.notification_role_enum NOT NULL,
    "notiType" character varying(100) NOT NULL
);


ALTER TABLE public.notification OWNER TO dev_account;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.orders (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    total_price numeric NOT NULL,
    payment_id uuid,
    status public.orders_status_enum DEFAULT 'WAITING_FOR_PAYMENT'::public.orders_status_enum NOT NULL,
    student_id uuid NOT NULL,
    customer_fullname character varying,
    customer_email character varying,
    customer_phone character varying
);


ALTER TABLE public.orders OWNER TO dev_account;

--
-- Name: orders_items; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.orders_items (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    price numeric NOT NULL,
    course_id uuid NOT NULL,
    order_id uuid,
    course_key uuid
);


ALTER TABLE public.orders_items OWNER TO dev_account;

--
-- Name: payments; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.payments (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    pay_type character varying NOT NULL,
    payment_status boolean DEFAULT false NOT NULL,
    amount integer NOT NULL,
    pay_info jsonb
);


ALTER TABLE public.payments OWNER TO dev_account;

--
-- Name: permissions; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.permissions (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    name character varying(100) NOT NULL,
    description text,
    id character varying(40) NOT NULL
);


ALTER TABLE public.permissions OWNER TO dev_account;

--
-- Name: quizzes; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.quizzes (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    content text NOT NULL,
    choice_a text,
    choice_b text,
    choice_c text,
    choice_d text,
    "order" integer DEFAULT 1 NOT NULL,
    explanation text,
    correct_choices text,
    lesson_part_id uuid
);


ALTER TABLE public.quizzes OWNER TO dev_account;

--
-- Name: role; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.role (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    description text,
    id character varying(40) NOT NULL
);


ALTER TABLE public.role OWNER TO dev_account;

--
-- Name: roles_permissions; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.roles_permissions (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    role_id character varying(40) NOT NULL,
    permission_id character varying(40) NOT NULL
);


ALTER TABLE public.roles_permissions OWNER TO dev_account;

--
-- Name: student_complete_lessons; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.student_complete_lessons (
    lesson_id uuid NOT NULL,
    student_id uuid NOT NULL,
    create_at timestamp without time zone NOT NULL,
    progress integer DEFAULT 0 NOT NULL,
    is_complete boolean DEFAULT false NOT NULL,
    complete_at timestamp without time zone
);


ALTER TABLE public.student_complete_lessons OWNER TO dev_account;

--
-- Name: student_complete_quizzes; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.student_complete_quizzes (
    quiz_id uuid NOT NULL,
    student_id uuid NOT NULL,
    create_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.student_complete_quizzes OWNER TO dev_account;

--
-- Name: students; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.students (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(70),
    phone_number character varying(15),
    password character varying(150) NOT NULL,
    role_id character varying,
    google_id character varying(50),
    facebook_id character varying(50),
    avatar text,
    address character varying(100),
    birthday date
);


ALTER TABLE public.students OWNER TO dev_account;

--
-- Name: test; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.test (
);


ALTER TABLE public.test OWNER TO postgres;

--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.account (id, email, password, fullname, address, phone_number, birthday, create_at, update_at) FROM stdin;
\.


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.cart_items (cart_id, course_id) FROM stdin;
28d69c66-a29d-4d97-aa1d-dd2838e67997	3c7e4cc0-461b-43c3-95ba-74936720383b
28d69c66-a29d-4d97-aa1d-dd2838e67997	1d3074c1-a3a6-4066-8594-8fa5900a3e87
28d69c66-a29d-4d97-aa1d-dd2838e67997	2d6872c9-b890-4d8d-9434-fbc6efccdd62
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.carts (id, student_id) FROM stdin;
00414c6d-6d41-4f24-bf0e-429f3fe98cff	ea51fc33-82a2-4e55-9c86-a7a9ea73413b
167d28df-fdbf-4929-88d2-f8fb97e1ee16	930c9500-c247-4f18-95dd-f0f54bc2e3ec
1f99dbc5-9d46-43e3-b62a-f9c1a6ae4bc2	3a69a0c9-a7de-4f93-9a6d-0410e38af0b7
fa755c42-871e-44eb-ab27-299e95ad12cf	488a5b1b-1f64-4c8e-8a54-641e75973503
edbd8b33-d096-4226-a555-febb2e4089e3	543bdbdf-5361-4eac-9094-49ba9182d034
7a21a303-1893-416a-b876-eff7c1e1f36d	259cb49b-7584-466c-80ee-34548d95cb20
0bda1461-58f3-477d-bf0a-b4e908ed46b3	44badb88-ab1b-470b-920a-bd951dc71cff
cb176f11-7b27-4eff-a55c-06de2deb8a1e	69929ffb-c9f6-4a76-8e20-c6ff90162fbf
28d69c66-a29d-4d97-aa1d-dd2838e67997	740034a9-1e8a-4b0d-a8e8-549914b6dd21
dbb60ce0-9572-47e6-a91e-bd04f6c243bd	09aa11c1-d922-4e8a-8427-c9f4c36138c0
eadc745d-efdb-4cd2-930a-e38981ed961f	e8e2b77b-170e-4d64-bcbc-bdd16ec8687b
c8a28757-fd58-459d-9d59-aebdcbf1a386	3a8ce626-e977-4de2-a4e8-09466b11433e
b2c2098d-74e9-433e-87a7-1bea70510d2d	75dd598e-36c9-455f-a185-0ec8a7caf482
b9f78870-6941-47a8-ba38-72dde9de90d5	19c672ef-e436-44d9-a76a-853e5b65ca8d
b39cca6e-3ae1-46b2-913a-4ebb2bacd868	42d93c29-d2c3-4da8-bdeb-cb273b6e7be1
1cb4649f-5115-4393-b456-179d54310d0c	006e14c6-66bb-4b9e-97ae-2730126553fa
1a081811-3723-4c08-baa8-5f09ce938e23	7d302099-c41b-4aae-9a7e-d89cf0ee22f9
dd16edfd-dc15-407e-a455-18cef7f1ecd5	2848b3ab-0109-4341-b265-6b65c5da3a83
\.


--
-- Data for Name: course_categories; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.course_categories (create_at, update_at, create_by, update_by, delete_at, id, name, description, thumbnail) FROM stdin;
2024-10-09 02:51:15.60177	2024-10-09 02:51:15.60177	\N	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	Lập trình	\N	\N
2024-10-25 17:54:23.051591	2024-10-25 17:54:23.051591	\N	\N	\N	550e8400-e29b-41d4-a716-446655440000	Tiếng Anh	IELTS	aaxx
2024-10-31 08:24:58.718813	2024-10-31 08:24:58.718813	\N	\N	\N	66f73da5-ac8a-468c-ae99-a6952b45410d	Âm nhạc	Các khóa học âm nhạc như piano, guitar, violin,...	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG11BG3RzHHXSYv7usPvayWGOErpL00obiNg&s
2024-12-08 02:09:31.982886	2024-12-08 02:09:31.982886	\N	\N	\N	0a607015-a2f8-4378-a96d-4d1d248e44ed	a	a	blob:http://localhost:3001/71fb97de-df90-4e55-8f75-7cb105bb78fa
2024-12-08 02:09:35.973119	2024-12-08 02:09:35.973119	\N	\N	\N	1f13de4c-f07b-46e6-90c7-5f222f6b6919	a	a	blob:http://localhost:3001/e4301cbe-2a02-4ca2-bd16-b7ad6279a20b
2024-12-15 09:38:26.401613	2024-12-15 09:38:26.401613	\N	\N	\N	8cb171f0-25a3-4339-a894-e872a21848a0	Âm nhạc	Âm nhạc	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ88EmlxyCzUDRlMxQMtYfHDp48bEAYfESNsA&s
2024-12-16 02:58:24.958747	2024-12-16 02:58:24.958747	\N	\N	\N	4f779a58-a252-4e33-9fe1-23c2224a2030	Khoa	123	https://csairs.website/media/eduhub-image/7739dac3-5a14-45cf-af88-3045fb1d774f
2024-12-16 03:05:13.162043	2024-12-16 03:05:13.162043	\N	\N	\N	c9d2b6aa-d321-48e2-ad62-dce7cba67646	1	1	https://csairs.website/media/eduhub-image/d1cde5f9-573c-44b6-8d96-11ec117a2cf6
2024-12-16 03:07:16.838714	2024-12-16 03:07:16.838714	\N	\N	\N	067e7ab0-497e-4a37-baeb-085e5bc3b0c0	Khoa2	test	https://csairs.website/media/eduhub-image/253619a3-e091-44dc-8aca-be739dfa7404
2024-12-18 03:24:29.094327	2024-12-18 03:24:29.094327	\N	\N	\N	b44edd90-3c83-4e50-b248-dae182ff3ce3	Test 18/12	18/12	https://csairs.website/media/eduhub-image/b6ed6063-c4d6-40ce-9ab2-4d615df54b08
2024-12-18 03:24:35.573543	2024-12-18 03:24:35.573543	\N	\N	\N	3cbaeb5e-14e6-4538-98b2-0d6221a49d9a	Test 18/12	18/12	https://csairs.website/media/eduhub-image/e9ebe5ce-5d86-47b1-9a99-8772599c82a1
\.


--
-- Data for Name: course_keys; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.course_keys (create_at, update_at, create_by, update_by, delete_at, key, is_used, course_id, order_id) FROM stdin;
\.


--
-- Data for Name: course_ratings; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.course_ratings (create_at, update_at, create_by, update_by, delete_at, id, course_id, rating_point, comment, student_id, liked, unliked) FROM stdin;
2024-11-14 19:15:13.001336	2024-11-14 19:15:13.001336	\N	\N	\N	f3e119e6-48c4-46f8-ae5c-4c38d52f353b	95eabf10-5a9a-45db-ab13-9c37c390b4c2	5	Khóa học rất hữu ích	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	0	0
2024-11-14 19:16:51.859635	2024-11-14 19:16:51.859635	\N	\N	\N	75cdb6e0-e3af-4920-a56f-38951379cb22	95eabf10-5a9a-45db-ab13-9c37c390b4c2	5	Khóa học rất hữu ích	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	0	0
2024-11-14 21:30:18.161897	2024-11-14 21:30:18.161897	\N	\N	\N	edff971b-3a2c-4d5b-89c0-84ef58c4a592	95eabf10-5a9a-45db-ab13-9c37c390b4c2	4	10 điểm cho khóa học	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	0	0
2024-12-14 15:44:20.275248	2024-12-14 15:44:20.275248	\N	\N	\N	9aff1661-a4ae-47bf-aaf5-9e81daccfe58	95eabf10-5a9a-45db-ab13-9c37c390b4c2	5	Khóa học rất hữu ích	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	0	0
2024-12-14 15:44:42.182356	2024-12-14 15:44:42.182356	\N	\N	\N	2e4acf45-148a-43c7-ab6d-2ae42dbe0a34	95eabf10-5a9a-45db-ab13-9c37c390b4c2	4	10 điểm cho khóa học	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	0	0
2024-11-14 19:15:58.674	2024-11-14 19:15:58.674	\N	\N	\N	c643b4eb-c6ed-4b78-b5c0-61139f3a08da	95eabf10-5a9a-45db-ab13-9c37c390b4c2	5	khóa học quá tốt	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	0	0
2024-11-14 19:18:21.208	2024-11-14 19:18:21.208	\N	\N	\N	0670d1f6-e52b-4ea3-b62c-87a827fcfb35	95eabf10-5a9a-45db-ab13-9c37c390b4c2	5	khóa học quá tốt	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	0	0
2024-12-18 07:16:54.258143	2024-12-18 07:16:54.258143	\N	\N	\N	24cdcc8e-5c36-4e26-8155-2b36b4687153	7082cf6c-5a39-4c40-a184-4b83e66f89dc	5	Khóa học rất hữu ích	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	0	0
2024-12-18 07:41:38.951555	2024-12-18 07:41:38.951555	\N	\N	\N	749e7a98-2670-45c4-a713-d56c72e84da6	7082cf6c-5a39-4c40-a184-4b83e66f89dc	5	Khóa học rất hữu ích	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	0	0
2024-12-18 07:44:16.575761	2024-12-18 07:44:16.575761	\N	\N	\N	0588648e-2fd3-4512-999f-7be74b24b7b5	7082cf6c-5a39-4c40-a184-4b83e66f89dc	5	Khóa học rất hữu ích	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	0	0
2024-12-18 09:22:21.256703	2024-12-18 09:22:21.256703	\N	\N	\N	56a82f85-b5b3-411f-b6d4-48a5a67eeb0f	30d2b059-716e-445e-ad20-bd7341d7adda	5	Khóa học rất hữu ích	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	0	0
2024-12-18 09:40:08.702673	2024-12-18 09:40:08.702673	\N	\N	\N	616a1960-ae99-4e92-8764-93ecfc405b86	30d2b059-716e-445e-ad20-bd7341d7adda	5	hay	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	0	0
2024-12-18 10:15:17.873137	2024-12-18 10:15:17.873137	\N	\N	\N	6ab2badb-0a03-4898-b69d-f894d5a1ff0c	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	4	4 sao	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	0	0
2024-12-18 10:25:44.153988	2024-12-18 10:25:44.153988	\N	\N	\N	53ed1e0a-cd9c-4603-b832-e79f009dea5a	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	5	5 sao	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	0	0
2024-12-18 10:26:35.254604	2024-12-18 10:26:35.254604	\N	\N	\N	c3ad37c5-65c1-496f-9149-7d75cb5d72d5	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	2	2 sao	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	0	0
2024-12-18 07:45:11.900757	2024-12-18 11:15:27.84302	\N	\N	\N	383d9363-073a-4fe7-8647-e579094bebf2	7082cf6c-5a39-4c40-a184-4b83e66f89dc	4	khóa học khá tốt	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	0	0
2024-12-18 10:27:58.751825	2024-12-18 11:47:09.325756	\N	\N	\N	bbc6998b-22a3-4aa2-84ae-dfb941e14118	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	2	khoa hoc khong xin	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	0	0
2024-12-18 10:27:23.406757	2024-12-18 11:33:23.558101	\N	\N	\N	5420179b-3bbb-4b38-b774-118a2077e163	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	5	khóa học quá cùi	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	0	0
2024-12-18 11:49:47.008273	2024-12-18 11:51:02.373977	\N	\N	\N	fea3f892-d919-42d4-a667-6221789f97e6	3c7e4cc0-461b-43c3-95ba-74936720383b	4	html css	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	0	0
2024-12-19 02:03:49.296453	2024-12-19 02:03:49.296453	\N	\N	\N	6a2f3651-ad2b-410c-bc15-3bf13e353c49	30d2b059-716e-445e-ad20-bd7341d7adda	1	1 sao	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	0	0
2024-12-19 02:04:01.373931	2024-12-19 02:04:01.373931	\N	\N	\N	e9f069b4-c538-4ddf-852e-e1b86308ea1f	30d2b059-716e-445e-ad20-bd7341d7adda	2	2 sao	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	0	0
2024-12-19 02:04:06.931333	2024-12-19 02:04:06.931333	\N	\N	\N	1d0e8991-b818-44d5-a767-37a1f4deeeb7	30d2b059-716e-445e-ad20-bd7341d7adda	3	3 sao	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	0	0
2024-12-19 02:04:13.449852	2024-12-19 02:04:13.449852	\N	\N	\N	35c60988-d911-44ee-b5e0-71fcbb698b4b	30d2b059-716e-445e-ad20-bd7341d7adda	4	4vsao	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	0	0
2024-12-19 02:04:19.351134	2024-12-19 02:04:19.351134	\N	\N	\N	859744f6-3c3f-4d9a-b05f-81a09dcb038a	30d2b059-716e-445e-ad20-bd7341d7adda	5	5 sao	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	0	0
2024-12-19 02:04:30.383283	2024-12-19 02:04:30.383283	\N	\N	\N	ebeecb81-c149-404d-8e2d-a30849b5f1f2	30d2b059-716e-445e-ad20-bd7341d7adda	5	6 sao	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	0	0
\.


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.courses (create_at, update_at, create_by, update_by, delete_at, id, name, thumbnail, duration, difficulty_level, start_date, end_date, category_id, lecturer_id, is_approved, name_en, original_price, sell_price, short_description, introduction, participants, course_targets, welcome_join, video_sale, course_materials, lowest_price, "socialGroupLink", "courseLink", tags, is_free_course, start_free_date, end_free_date, status, total_students, total_reviews, average_rating) FROM stdin;
2024-11-19 06:30:23.61962	2024-11-19 08:00:32.185378	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	c15ff891-9129-41a5-b85f-e687fc4c5213	Lập trình Java Spring Boot Backend cho người mới bắt đầu	https://example.com/image.png	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	This is a beginner level course for Spring Boot Developer.	Khóa học dành cho người mới bắt đầu	Ai có thể tham gia khóa học này: 1. Sinh viên IT đã từng tiếp xúc với lập trình. 2. Lập trình viên đang quan tâm tới Java Spring Boot	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-04 13:37:01.829644	2024-12-04 13:37:01.829644	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	b408c117-5f53-4bff-9e0c-3d069685536f	32135135	undefined	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	312312	\N	3123123	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-02 15:01:03.580875	2024-12-02 15:01:03.580875	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	9c05c92e-45e3-4e4d-b4ac-f5f4c0ea5c99	Lập trình Java Spring Boot Backend cho người mới bắt đầu	https://example.com/image.png	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	This is a beginner level course for Spring Boot Developer.	Khóa học dành cho người mới bắt đầu	Ai có thể tham gia khóa học này: 1. Sinh viên IT đã từng tiếp xúc với lập trình. 2. Lập trình viên đang quan tâm tới Java Spring Boot	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-02 14:18:55.5149	2024-12-02 14:18:55.5149	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	4842e41d-9f78-4e40-b359-0ab6c4a6382a	Lập trình Java Spring Boot Backend cho người mới bắt đầu	https://example.com/image.png	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	This is a beginner level course for Spring Boot Developer.	Khóa học dành cho người mới bắt đầu	Ai có thể tham gia khóa học này: 1. Sinh viên IT đã từng tiếp xúc với lập trình. 2. Lập trình viên đang quan tâm tới Java Spring Boot	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-02 15:05:35.888067	2024-12-02 15:05:35.888067	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	a180ec7d-73d9-453d-9dfc-e18400b9efd9	Lập trình Java Spring Boot Backend cho người mới bắt đầu	https://example.com/image.png	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	This is a beginner level course for Spring Boot Developer.	Khóa học dành cho người mới bắt đầu	Ai có thể tham gia khóa học này: 1. Sinh viên IT đã từng tiếp xúc với lập trình. 2. Lập trình viên đang quan tâm tới Java Spring Boot	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-02 14:44:48.653094	2024-12-02 14:44:48.653094	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	a805c136-ba5a-47bf-a1b8-519a1104414f	Lập trình Java Spring Boot Backend cho người mới bắt đầu	https://example.com/image.png	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	This is a beginner level course for Spring Boot Developer.	Khóa học dành cho người mới bắt đầu	Ai có thể tham gia khóa học này: 1. Sinh viên IT đã từng tiếp xúc với lập trình. 2. Lập trình viên đang quan tâm tới Java Spring Boot	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-02 14:50:46.175224	2024-12-02 14:50:46.175224	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	66c93332-3e00-44bf-b8a7-853549b30aa7	Lập trình Java Spring Boot Backend cho người mới bắt đầu	https://example.com/image.png	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	This is a beginner level course for Spring Boot Developer.	Khóa học dành cho người mới bắt đầu	Ai có thể tham gia khóa học này: 1. Sinh viên IT đã từng tiếp xúc với lập trình. 2. Lập trình viên đang quan tâm tới Java Spring Boot	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-11-15 03:06:50.5221	2024-11-19 10:01:32.051709	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	4ee424a6-48c3-4f84-b89a-119a51557c92	Lập trình Java Spring Boot Backend cho người mới bắt đầu	https://example.com/image.png	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-04 13:37:01.839327	2024-12-04 13:37:01.839327	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	4c9add54-237a-402d-a1ae-4eaf6c327359	32135135	undefined	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	312312	\N	3123123	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-04 13:37:17.305704	2024-12-04 13:37:17.305704	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	ebe4337e-e739-4b0d-b2b2-5ea07a57ca65	32135135	undefined	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	312312	\N	3123123	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-05 12:30:41.601119	2024-12-05 12:30:41.601119	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	6cb94251-592f-4cdf-b66d-4344db83a341	Thiet ke trang phuc T1	undefined	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	3153435	\N	5345	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-04 14:22:54.070167	2024-12-04 14:22:54.070167	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	6a26b34c-067f-4444-882c-1e657b1f5f8f	Khoa Khung	undefined	0.0	easy	\N	\N	66f73da5-ac8a-468c-ae99-a6952b45410d	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	koa khugbn	\N	312312	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-10-27 09:15:41.775035	2024-11-19 15:46:03.618313	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	469d5513-81d6-43c8-ae81-edbd778966be	Lập trình Golang Backend cho người mới bắt đầu	https://example.com/image.png	10.5	easy	2024-01-01	2024-02-01	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-04 14:22:55.220649	2024-12-04 14:22:55.220649	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	619298f1-adbf-44a6-ac16-3ff7f9bd1680	Khoa Khung	undefined	0.0	easy	\N	\N	66f73da5-ac8a-468c-ae99-a6952b45410d	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	koa khugbn	\N	312312	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-16 12:58:20.542446	2024-12-16 12:58:20.542446	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	887eb05d-d66b-4862-bc5d-b3e689f95166	ReactJS mới nhất 2022	https://csairs.website/media/eduhub-image/d509b435-a56b-41be-987e-96e5aa982b5a	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	Khoá học ReactJS mới nhất 2022, mục tiêu của khoá này là giúp các bạn có thể đầy đủ hành trang để đi làm	Khoá học ReactJS mới nhất 2022, mục tiêu của khoá này là giúp các bạn có thể đầy đủ hành trang để đi làm	Dành cho người có mong muốn làm FE với ReactJS	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-05 12:47:14.140115	2024-12-05 12:47:14.140115	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	96eed2aa-f9d7-4348-afaa-c2a3921974bd	Thiet ke trang phuc T1	https://csairs.website/media/eduhub-image/3702ac63-bda5-4df5-b740-02129157ed9d	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	31231	\N	3121	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-10-27 09:36:12.893532	2024-12-18 11:47:09.347297	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	Lập trình NodeJS Backend cho người mới bắt đầu	https://csairs.website/media/eduhub-image/5f26ef00-ebbb-45a4-8a1e-eb47659f6a53	10.5	easy	2024-01-01	2024-02-01	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	t	\N	200000	100000	\N	\N	\N	\N	\N	\N	\N	0	\N	\N	\N	f	\N	\N	PUBLISHED	0	3	3
2024-12-02 14:55:28.46418	2024-12-16 04:22:55.934056	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	0f855ee9-6346-4e99-ae5a-8f9db7626172	Lập trình Java Spring Boot Backend cho người mới bắt đầu	https://example.com/image.png	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	2	0	This is a beginner level course for Spring Boot Developer.	Khóa học dành cho người mới bắt đầu	Ai có thể tham gia khóa học này: 1. Sinh viên IT đã từng tiếp xúc với lập trình. 2. Lập trình viên đang quan tâm tới Java Spring Boot	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-16 14:05:34.120984	2024-12-16 14:42:14.461776	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	29b9a76e-b5a1-437a-ae38-4f53c172232c	ReactJS mới nhất 2022	https://csairs.website/media/eduhub-image/538ef096-d444-47b8-b21e-5baf3b2cf527	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	5777	0	Khoá học ReactJS mới nhất 2022, mục tiêu của khoá này là giúp các bạn có thể đầy đủ hành trang để đi làm	Khoá học ReactJS mới nhất 2022, mục tiêu của khoá này là giúp các bạn có thể đầy đủ hành trang để đi làm	Người cần kiến thức làm FE với ReactJS	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-16 03:16:38.656858	2024-12-16 03:16:38.656858	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	acd61539-f922-4117-a420-eef51bbbd2d7	Lập trình Java Spring Boot Backend cho người mới bắt đầu	https://example.com/image.png	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	This is a beginner level course for Spring Boot Developer.	Khóa học dành cho người mới bắt đầu	Ai có thể tham gia khóa học này: 1. Sinh viên IT đã từng tiếp xúc với lập trình. 2. Lập trình viên đang quan tâm tới Java Spring Boot	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-10-09 02:51:37.442064	2024-12-19 05:17:38.732055	\N	\N	\N	95eabf10-5a9a-45db-ab13-9c37c390b4c2	Devops cho người mới bắt đầu	https://csairs.website/media/eduhub-image/37c021c1-9274-4b03-9f1b-9d0851e1b26a	20.0	medium	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	t	Devops for fresher	120000	140000	Khóa học Devops cho người mới bắt đầu. Tất tần tật mọi thứ từ Linux, Docker, CI/CD, K8S, Cloud,...	<p><strong style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">Bạn có biết:</strong></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">Khóa học "Cẩm nang A-Z Illustrator cho Designer" chính là dành cho bạn, người...</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">Đam mê yêu thích đồ họa, nhiếp ảnh, thiết kế sản phẩm.</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">Đang đi làm cần bổ sung, chuẩn hóa kiến thức, tăng khả năng hoàn thiện và thăng tiến trong nghề nghiệp</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">Sinh viên chuyên ngành marketing, truyền thông, mỹ thuật, thiết đồ họa, thời trang, họa viên… cần kỹ năng sử dụng thành thạo phần mềm illustrator để&nbsp;phục vụ cho công việc và&nbsp;học thiết kế...</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">Đang&nbsp;làm việc trong lĩnh vực marketing, truyền thông, kinh doanh,…</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">Và bất cứ ai yêu thích công việc sáng tạo và thiết kế với phần mềm Adobe Illustrator!</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">Hãy tham gia ngay khóa học&nbsp;"Cẩm nang A-Z Illustrator cho Designer"&nbsp;tại Unica!</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">&nbsp;&nbsp;✔️ Khóa học do giảng viên Phạm Đức Huy trực tiếp hướng dẫn. Khóa học sẽ giúp bạn có được những kiến thức và kỹ năng nền tảng nhất để các bạn tiến gần hơn và&nbsp;trở thành một Graphic Designer, Web Designer, Game UI UX Designer hoặc Motion Graphic Designer ngay tại nhà!</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">&nbsp;&nbsp;✔️ Khóa học là nền tảng để các bạn hiểu sâu hơn về bản chất công cụ của phần mềm Adobe Illustrator, từ đó các bạn dễ dàng xin được việc tại các công ty thiết kế lớn ở Việt Nam.</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">&nbsp;&nbsp;✔️ Khóa học được soạn từ những dự án thực tế với nhiều khách hàng, vì vậy tính ứng dụng của khóa học luôn gắn liền với thị trường hiện tại. Học viên có thể ứng dụng ngay những kiến thức và kỹ năng mình học được vào trong công việc hiện tại của bản thân.</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">Nội dung khóa học cụ thể:</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">Phần 1: Giới thiệu và hướng dẫn tạo các hình khối</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">Phần 2: Các tính năng của Shapes và bài tập thực hành</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">Phần 3: Hướng dẫn các công cụ Drawing Tools, Pen Tool và Brushes</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">Phần 4: Hướng dẫn các công cụ nâng cao trong thiết kế đồ họa</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">Trở thành nhà thiết kế chuyên nghiệp với phần mềm Ai ngay hôm nay với&nbsp;khóa học&nbsp;"Cẩm nang A-Z Illustrator cho Designer"&nbsp;tại EduHub thôi nào!</span></p>	<p>Để tham gia khóa học này, bạn cần: </p><p>1. Có kiến thức về sử dụng máy tính. </p><p>2. Là sinh viên CNTT có nguyện vọng tìm hiểu về Devopsdasdasd</p><p>dsadasdas</p>	Thành thạo các kĩ năng Devops cơ bản,Biết triển khai mọi dự án phần mềm	dsadasdsa		http://file.pdf	0	https://facebook.com.vn	https://course.com.vn	devops,cicd,beginer	f	\N	\N	PUBLISHED	0	0	0
2024-12-14 13:14:49.720598	2024-12-15 16:31:20.136361	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	2d6872c9-b890-4d8d-9434-fbc6efccdd62	Test tạo khoá học	https://csairs.website/media/eduhub-image/e1aa14d0-88fe-42fe-a3d2-a1f986a12952	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	t	\N	0	0	Test tạo khoá học	\N	Người đi làm	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	PUBLISHED	0	0	0
2024-12-07 14:51:37.18219	2024-12-19 02:04:13.505111	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	30d2b059-716e-445e-ad20-bd7341d7adda	Lập trình C++ từ cơ bản đến nâng cao	https://i.ytimg.com/vi/Da1tpV9TMU0/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLC7hegpDz0ZOzdyzr9zrbXXIv2PtQ	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	t	C++ from begin to advance	150000	120000	Khóa học Lập trình C++ từ cơ bản đến nâng cao sẽ mang tới cho các bạn kiến thức chi tiết từ cơ bản cho tới nâng cao về C++	Khóa học dành cho người mới bắt đầu	Ai có thể tham gia khóa học này: 1. Sinh viên IT đã từng tiếp xúc với lập trình. 2. Lập trình viên đang quan tâm tới C++	Thành thạo các C++ cơ bản,Có nền tảng để tiếp tục con đường lập trình sau này	Chào mừng bạn đã đến với khóa học.		http://file.pdf	0	https://facebook.com.vn	https://course.com.vn	c++,programing,beginer	f	\N	\N	PUBLISHED	0	4	4
2024-12-16 03:14:31.748511	2024-12-16 08:05:20.051851	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	92d6a9c2-ea6f-42d3-8903-0187f4af2ff3	Lập trình Java Spring Boot Backend cho người mới bắt đầu	https://example.com/image.png	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	t	\N	0	0	This is a beginner level course for Spring Boot Developer.	Khóa học dành cho người mới bắt đầu	Ai có thể tham gia khóa học này: 1. Sinh viên IT đã từng tiếp xúc với lập trình. 2. Lập trình viên đang quan tâm tới Java Spring Boot	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	PUBLISHED	0	0	0
2024-12-16 08:57:00.012429	2024-12-16 08:58:56.98972	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	81790ad0-806f-400a-86f2-0a95b62c7ab8	TestCreate 16/12	https://csairs.website/media/eduhub-image/41c93c4e-30f1-4ed2-8f14-97772654e891	0.0	easy	\N	\N	4f779a58-a252-4e33-9fe1-23c2224a2030	54d7b28e-0444-4ed4-8973-e5a2d9abb692	t	\N	0	0	SirLora in the picture	SirLora in the picture	SirLora in the picture	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	PUBLISHED	0	0	0
2024-12-16 03:53:44.380727	2024-12-16 08:12:18.917219	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	c5bcd53f-a8c5-4f76-8fc7-288705cac018	Test sáng 16/12/2024 2	https://csairs.website/media/eduhub-image/c8be7b59-5d33-4401-8ec5-8e257afc0b89	0.0	easy	\N	\N	8cb171f0-25a3-4339-a894-e872a21848a0	54d7b28e-0444-4ed4-8973-e5a2d9abb692	t	\N	0	0	Test sáng 16/12/2024 2	Test sáng 16/12/2024 2	Test sáng 16/12/2024 2	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	PUBLISHED	0	0	0
2024-12-16 12:28:52.737954	2024-12-16 12:28:52.737954	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	1d3074c1-a3a6-4066-8594-8fa5900a3e87	Javascrip cơ bản	https://csairs.website/media/eduhub-image/8d44255d-0411-4ca6-803a-70db543427c1	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	Học Javascript cơ bản phù hợp cho người chưa từng học lập trình. Với hơn 100 bài học và có bài tập thực hành sau mỗi bài học.	Javascript cơ bản phù hợp cho người chưa từng học lập trình	Javascript cơ bản phù hợp cho người chưa từng học lập trình	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-16 03:40:52.568104	2024-12-16 08:14:30.13892	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	fafd109d-1b61-4c0a-a0eb-5295463a4dfb	Test sáng 16/12/2024	https://csairs.website/media/eduhub-image/f8579db7-3f85-4f87-a651-f3c591abf791	0.0	easy	\N	\N	550e8400-e29b-41d4-a716-446655440000	54d7b28e-0444-4ed4-8973-e5a2d9abb692	t	\N	0	0	Test sáng 16/12/2024	Test sáng 16/12/2024	Test sáng 16/12/2024	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	PUBLISHED	0	0	0
2024-12-16 12:40:48.105972	2024-12-16 12:40:48.105972	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	0612e4a6-e077-4ffb-8161-f62edaab1a1f	Javascript nâng cao	https://csairs.website/media/eduhub-image/ee86b4f1-fbb6-409e-ab97-3d0558936677	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	Hiểu sâu hơn về cách Javascript hoạt động, hiểu các khái niệm Javascript nâng cao như: IIFE, closure, reference types, this keyword, bind, call, apply, ...	Hiểu sâu hơn về cách Javascript hoạt động, hiểu các khái niệm Javascript nâng cao như: IIFE, closure, reference types, this keyword, bind, call, apply, ...	Những người đã có kiến thức cơ bản về js, muốn tìm hiểu kiến thức nâng cao hơn của lập trình js	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-16 12:40:48.553365	2024-12-16 12:40:48.553365	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	70f34439-83bf-4a09-bc0f-39a1c9d2109f	Javascript nâng cao	https://csairs.website/media/eduhub-image/af3e8bc1-e803-46ff-ae8a-fe7adf464cd4	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	Hiểu sâu hơn về cách Javascript hoạt động, hiểu các khái niệm Javascript nâng cao như: IIFE, closure, reference types, this keyword, bind, call, apply, ...	Hiểu sâu hơn về cách Javascript hoạt động, hiểu các khái niệm Javascript nâng cao như: IIFE, closure, reference types, this keyword, bind, call, apply, ...	Những người đã có kiến thức cơ bản về js, muốn tìm hiểu kiến thức nâng cao hơn của lập trình js	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-16 03:40:39.667409	2024-12-16 08:15:11.318021	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	82650084-8b9a-403e-b940-5c711257e001	Test sáng 16/12/2024	https://csairs.website/media/eduhub-image/a8fd5bb9-e884-4e51-8bb2-ccd7277fe5b4	0.0	easy	\N	\N	550e8400-e29b-41d4-a716-446655440000	54d7b28e-0444-4ed4-8973-e5a2d9abb692	t	\N	0	0	Test sáng 16/12/2024	Test sáng 16/12/2024	Test sáng 16/12/2024	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	PUBLISHED	0	0	0
2024-12-16 04:01:30.696986	2024-12-16 08:19:33.149661	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	2024-12-16 08:19:33.094	53980d5d-d688-4f7a-a6c1-e4b398414628	Test sáng 16/12/2024 3	https://csairs.website/media/eduhub-image/443dac91-904a-4d7b-b925-9d8c17f05025	0.0	easy	\N	\N	4f779a58-a252-4e33-9fe1-23c2224a2030	54d7b28e-0444-4ed4-8973-e5a2d9abb692	t	\N	0	0	Test sáng 16/12/2024 3	Test sáng 16/12/2024 3	Test sáng 16/12/2024 3	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	PUBLISHED	0	0	0
2024-12-16 14:05:36.847246	2024-12-16 14:38:50.389247	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	d08e2c7b-0030-43f1-b6a4-7cebd2beb7db	ReactJS mới nhất 2022	https://csairs.website/media/eduhub-image/de108f56-fef7-4b7f-ad48-18d0671aa2b7	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	t	\N	0	0	Khoá học ReactJS mới nhất 2022, mục tiêu của khoá này là giúp các bạn có thể đầy đủ hành trang để đi làm	Khoá học ReactJS mới nhất 2022, mục tiêu của khoá này là giúp các bạn có thể đầy đủ hành trang để đi làm	Người cần kiến thức làm FE với ReactJS	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	PUBLISHED	0	0	0
2024-12-16 04:19:00.672762	2024-12-18 11:15:27.96949	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	7082cf6c-5a39-4c40-a184-4b83e66f89dc	Lập trình C# cơ bản	https://csairs.website/media/eduhub-image/2a261b4a-9c97-47de-8a27-7e4a06f60a76	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	t	\N	0	0	Khoá học LẬP TRÌNH C# CƠ BẢN sẽ mang đến toàn bộ những kiến thức cơ bản về C#	Khoá học LẬP TRÌNH C# CƠ BẢN sẽ mang đến toàn bộ những kiến thức cơ bản về C#	Dành cho tất cả các bạn yêu thích lập trình và mong muốn bắt đầu với một ngôn ngữ cơ bản	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	PUBLISHED	0	1	4
2024-12-16 15:39:26.038471	2024-12-18 11:51:02.456674	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	3c7e4cc0-461b-43c3-95ba-74936720383b	HTML & CSS	https://csairs.website/media/eduhub-image/187212ba-df23-4dfb-a0e1-77450aaaeb7b	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	Đây sẽ là khóa học dành cho những người mới bắt đầu tìm hiểu về web hoặc những người quên đi kiến thức về HTML & CSS do không sử dụng nó trong một khoảng thời gian dài. 	Đây sẽ là khóa học dành cho những người mới bắt đầu tìm hiểu về web hoặc những người quên đi kiến thức về HTML & CSS do không sử dụng nó trong một khoảng thời gian dài. 	Dành cho những người mới bắt đầu tìm hiểu về web hoặc những người quên đi kiến thức về HTML & CSS do không sử dụng nó trong một khoảng thời gian dài.	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	1	4
\.


--
-- Data for Name: discounts; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.discounts (create_at, update_at, create_by, update_by, delete_at, id, code, discount_amount, discount_percentage, start_date, end_date, course_id, "courseId") FROM stdin;
2024-12-06 07:51:23.426025	2024-12-06 07:51:23.426025	\N	\N	\N	ca23dbef-2831-4503-894d-6c41d58e16a0	CHRISTMAS2024	5	20	2024-12-06	2024-11-28	95eabf10-5a9a-45db-ab13-9c37c390b4c2	\N
2024-12-06 07:54:09.160189	2024-12-06 07:54:09.160189	\N	\N	\N	642b6820-6d90-4676-8de6-903ad548704a	NEWYEAR2025	5	20	2024-12-01	2025-01-10	95eabf10-5a9a-45db-ab13-9c37c390b4c2	\N
\.


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.employees (create_at, update_at, create_by, update_by, delete_at, id, name, email, phone_number, password, role_id, avatar) FROM stdin;
2024-10-02 07:03:15.756415	2024-10-02 07:03:15.756415	\N	\N	\N	aaf13906-fdd4-44d5-b370-124ee8685e6a	Nguyễn Văn Management Admin	management_admin@gmail.com	0909123456	$2a$04$NSKvCk5gb7MCtvBLKzFfAuB3PXMTLv7fu2PDcStnJJCpHqTPW1.HS	MANAGEMENT_ADMIN	\N
2024-10-09 15:20:16.446367	2024-10-09 15:20:16.446367	\N	\N	\N	86ba7e9e-aa90-481e-bf52-c17c537a5357	Nguyễn Văn Kế Toán	accountant1@gmail.com	+84912345679	$2b$10$orwle8rh0JQYMZyHoNU/ke7nuKJQWNwDMRD7B/zoYIksnc2J0eHMK	ACCOUNTANT	\N
2024-10-11 13:13:17.596315	2024-10-11 13:13:17.596315	\N	\N	\N	26f084e9-ca73-4054-a563-0b6e225de3ec	Nguyễn Văn Kế Toán 2	accountant2@gmail.com	+84912345677	$2b$10$DyuJihwbEHv3.iN9klNAmekqLza75J1HMMYhnUEhETNrtpN.yog2e	ACCOUNTANT	\N
2024-10-11 15:58:24.708184	2024-10-11 15:58:24.708184	\N	\N	\N	7ec639ba-3faf-4f39-93ab-c694b52c73c0		accountant3@gmail.com	+84912345676	$2b$10$.cx5xs8TJpCtAwg2Nfvzr.CJzPA.XZNuNstjYj6kUY1CoEYQ.JZs.	ACCOUNTANT	\N
2024-10-02 08:13:04.736419	2024-10-16 15:50:39.959848	\N	\N	\N	2f6f1e80-9079-4ed3-9df0-e1d21e629724	Nguyễn Văn Kế Toán	accountant@gmail.com	+84912345678	accountant	ACCOUNTANT	\N
2024-12-18 04:10:22.321515	2024-12-18 04:10:22.321515	\N	\N	\N	5c558e82-9665-4e1d-aa90-230427812814	Nguyễn Văn Kế Toán	123@gmail.com	+84912335679	$2b$10$E07UwN5WWxODGqNsvtl4L./0SX/IoSPzbJu5GY3gb66x32v1FvngO	ACCOUNTANT	\N
2024-12-18 05:19:22.836851	2024-12-18 05:19:22.836851	\N	\N	\N	7d10c857-f442-41bc-9029-cadc33e8866c	Sir Lora	lora@gmail.com	+84933516113	$2b$10$lfTnO8xOrdOioq9OZDOlyegcm3DID0ww6DaMcohqnyuizMTtRwZgq	BLD	https://csairs.website/media/eduhub-image/6f566b1c-4f09-434f-86dc-aa4666e4a86b
2024-12-18 05:22:40.44823	2024-12-18 05:22:40.44823	\N	\N	\N	70d71294-d260-4ae5-8d38-7917e89b9369	Khoa13	khoa13@gmail.com	+84933516555	$2b$10$2BNKfh25rXCdXRkw4Dd1AultLzjNnEGwK53WYNWUAbOviusk0gDqe	ACCOUNTANT	https://csairs.website/media/eduhub-image/d5265009-d874-411d-9512-eb3369aa7520
2024-12-18 04:26:00.235989	2024-12-18 05:25:25.917266	\N	\N	\N	e69ac6fe-c79c-4957-95ad-6fd242c35e16	Nguyễn Văn Kế Toán1	khoa123@gmail.com	+84933516434	lecturer	HELP_DESK	\N
\.


--
-- Data for Name: enrollments; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.enrollments (enrolled_date, status, completion_percentage, completion_date, student_id, course_id, certificate) FROM stdin;
2024-12-14	active	0	\N	740034a9-1e8a-4b0d-a8e8-549914b6dd21	95eabf10-5a9a-45db-ab13-9c37c390b4c2	\N
2024-12-14	active	0	\N	740034a9-1e8a-4b0d-a8e8-549914b6dd21	2d6872c9-b890-4d8d-9434-fbc6efccdd62	\N
2024-12-16	active	0	\N	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	2d6872c9-b890-4d8d-9434-fbc6efccdd62	\N
2024-12-17	active	0	\N	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	30d2b059-716e-445e-ad20-bd7341d7adda	\N
2024-12-17	active	0	\N	e8e2b77b-170e-4d64-bcbc-bdd16ec8687b	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	\N
2024-12-17	active	0	\N	e8e2b77b-170e-4d64-bcbc-bdd16ec8687b	95eabf10-5a9a-45db-ab13-9c37c390b4c2	\N
2024-12-19	active	0	\N	7d302099-c41b-4aae-9a7e-d89cf0ee22f9	30d2b059-716e-445e-ad20-bd7341d7adda	\N
2024-12-19	completed	100	2024-12-18	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	https://csairs.website/media/eduhub-image/f3d0bf4d-3b68-4d26-ba11-a9ce0e8e5868
2024-12-16	completed	100	2024-12-19	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	95eabf10-5a9a-45db-ab13-9c37c390b4c2	https://csairs.website/media/eduhub-image/89bb0ee1-e8ad-4227-a334-47d2477df161
\.


--
-- Data for Name: lecturers; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.lecturers (create_at, update_at, create_by, update_by, delete_at, id, name, email, phone_number, address, bio, password, role_id, email_verified, is_approved, avatar, short_description, example_video, social_link, teaching_topic, teaching_experience) FROM stdin;
2024-12-14 12:24:06.547387	2024-12-16 09:24:44.119001	\N	aaf13906-fdd4-44d5-b370-124ee8685e6a	\N	e8375c35-b6b4-49fc-8946-3067a554dcb8	Nguyen Thanh Sang	nguyenthanhsang22vn@gmail.com	+84868042952	Ap 6, Thoi Hoa, Ben Cat		$2b$10$YfV2CwdP8ufzYumBy21fgOP/.SYS1B6QPgZgL32YV28umhaYmHa3G	LECTURER	f	t	\N	\N	https://www.youtube.com/watch?v=MGhw6XliFgo&list=PL_-VfJajZj0U1MSx1IMu13oLJq2nM97ac&ab_channel=F8Official	https://www.facebook.com/nhdhieuu	Deep learning	course-list
2024-10-02 09:39:02.070417	2024-12-16 09:26:19.848717	\N	aaf13906-fdd4-44d5-b370-124ee8685e6a	\N	54d7b28e-0444-4ed4-8973-e5a2d9abb692	Nguyễn Văn Giảng Viên	lecturer@gmail.com	+84933516434	UIT	Tôi là giảng viên ở UIT	$2b$10$b0gWyT4JavGHYXsd9BGe1e.GLBPlafKMcstv0Z6bFQLLSUZr9GFyG	LECTURER	f	t	\N	\N	\N	\N	\N	\N
2024-12-11 08:15:28.102736	2024-12-16 14:40:21.311863	\N	aaf13906-fdd4-44d5-b370-124ee8685e6a	\N	eddc5ea9-453f-45a1-b83e-4b67d2bc5115	Nguyễn Văn Giảng Viên	chabu3364@gmail.com	+84933516439	UIT	Tôi là giảng viên ở UIT	$2b$10$Ojyq5XentjlW/TJt1QSQpuwHbiIYZpD5KPF.MsPIZfKEC/zOHzEae	LECTURER	f	t	\N	\N	https://www.youtube.com/watch?v=MGhw6XliFgo&list=PL_-VfJajZj0U1MSx1IMu13oLJq2nM97ac&ab_channel=F8Official	https://www.facebook.com/nhdhieuu	Lập trình Web	30 năm làm giảng viên tại trung tâm
2024-12-18 07:50:11.39952	2024-12-18 07:50:11.39952	\N	\N	\N	529be5ff-3ae3-4d21-828b-f839e2826776	Nguyen Van A	nguyenvana@example.com	0123456789	UIT	\N	$2b$10$foJGa2JSKg/iKrgKZOhJYun5umFFNT286ia4WdI7vDvo2RN6XH.nS	\N	f	f	https://example.com/avatar.jpg	\N	\N	\N	\N	\N
2024-12-18 08:26:13.391986	2024-12-18 08:26:13.391986	\N	\N	\N	1f1c4173-5bbc-4f68-a517-fb9ff2bf4f98	Nguyen Van A	nguyenvana123@example.com	01234567891	hello	\N	$2b$10$L8ZZm9ew2QmWc6hEJfQ7BeQMtOPcRvljKaQFCeY0JkQRJAh/zwOWK	\N	f	f	https://example.com/avatar.jpg	\N	\N	\N	\N	\N
2024-12-18 08:32:36.383	2024-12-18 08:32:36.383	\N	\N	\N	3024a89e-e59c-401a-9c0c-e6d4eb2470b0	Khoa1	khoa332@gmail.com	+84933516666		\N	123123	\N	f	f	\N	\N	\N	\N	\N	\N
2024-12-18 08:50:18.731372	2024-12-18 08:50:18.731372	\N	\N	\N	85a98c0f-8e3a-4fea-9345-9e5aac241ad9	Khoa2	khoa350@gmail.com	+84933516665	123	\N	$2b$10$hK9s4AkccRXxBUFfiO.7BeBsChC31vz6dY6sHjqwBem5Ho5/i19nG	\N	f	f	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: lesson_parts; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.lesson_parts (id, part_no, part_name, course_id) FROM stdin;
bd7ba758-23d9-471c-a534-9757946681cd	1	Phần 1. Tổng quan về Linux	\N
5b1a2c8f-68ef-4539-91ab-7240b5fb1ad1	1	Phần 1. Tổng quan về Linux	\N
a09b2806-0ba2-48ff-ad28-0b9816bc791d	1	Phần 1. Tổng quan về Linux	95eabf10-5a9a-45db-ab13-9c37c390b4c2
e456c6e6-a990-46ea-8e43-9e84da2f758a	2	Phần 2. Giới thiệu Docker test	\N
10995d70-7674-41c8-8fbc-ff894489259a	1	Phần 1: Giới thiệu	30d2b059-716e-445e-ad20-bd7341d7adda
66668607-6164-45f6-8313-c45cc3de35b1	2	Phần 2: Nội dung	30d2b059-716e-445e-ad20-bd7341d7adda
ec330914-c774-475d-8e19-10e113b9a09a	3	Phần 3: Thực hành	30d2b059-716e-445e-ad20-bd7341d7adda
44fc4c53-8a2c-4cce-97a5-3e006f1ca3f0	2	Phần 2: Docker cơ bản	\N
d020f0a6-c175-42fb-b735-681fe8230e9e	1	test1	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408
15caa99b-1a83-4585-8aea-90a370e358b4	1	Test sáng 16/12/2024	82650084-8b9a-403e-b940-5c711257e001
b5fbea82-3bbb-436f-abc0-d3bfb5ddc19c	1	Phần 1: Giới thiệu	7082cf6c-5a39-4c40-a184-4b83e66f89dc
52ed70d9-73cc-4894-b286-b36b411c3716	2	Phần 2: Nội dung	7082cf6c-5a39-4c40-a184-4b83e66f89dc
d4cddf43-6ad3-489d-99b1-c29a56cc6e0b	3	Phần 3: Thực hành	7082cf6c-5a39-4c40-a184-4b83e66f89dc
a2fc532a-39f0-4426-87de-b8316838bed2	1	Phần 1: Giới thiệu	1d3074c1-a3a6-4066-8594-8fa5900a3e87
dd98f5b4-84c8-432d-842c-ea267ed6b7bc	2	Phần 2: Nội dung	1d3074c1-a3a6-4066-8594-8fa5900a3e87
e1bbd8f3-4dff-44dd-bfbd-abbe4e50bd88	1	Phần 1	29b9a76e-b5a1-437a-ae38-4f53c172232c
eed927c6-d275-474c-b00d-7f7dbd261100	1	Phần 1: Giới thiệu	0612e4a6-e077-4ffb-8161-f62edaab1a1f
dec6d730-cdbf-412d-9bc3-5b4bfeb503f9	2	Phần 2: Nội dung	0612e4a6-e077-4ffb-8161-f62edaab1a1f
01c76298-0b97-416b-8378-3fb0e0dacd8a	2	Phần 2	29b9a76e-b5a1-437a-ae38-4f53c172232c
68aaefe1-6ad6-4a06-bf1f-993c1f68c1a0	2	Phan 3	95eabf10-5a9a-45db-ab13-9c37c390b4c2
7d68734e-d5fa-4ea8-bb79-1c737716023d	3	Phần 3	95eabf10-5a9a-45db-ab13-9c37c390b4c2
\.


--
-- Data for Name: lessons; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.lessons (create_at, update_at, create_by, update_by, delete_at, id, description, title, duration, "order", video_url, resource_link, lesson_part_id, introduction, is_free_trial) FROM stdin;
2024-11-15 08:41:22.636917	2024-11-15 08:41:22.636917	\N	\N	\N	e35dda2c-6f3b-416b-8aed-73d5a38b4dec	Trong bài này chúng ta sẽ thực hiện cài đặt Ubuntu server 20.04 lên KVM	Cài đặt Ubuntu lên máy ảo	20.0	1		https://linux-kvm.org/page/Main_Page,https://releases.ubuntu.com/focal/	bd7ba758-23d9-471c-a534-9757946681cd	\N	f
2024-11-15 09:10:45.067173	2024-11-15 09:10:45.067173	\N	\N	\N	376e362c-43c5-4ee6-94a0-3ebd189f5bb1	Trong bài này chúng ta sẽ thực hiện cài đặt Ubuntu server 20.04 lên KVM	Cài đặt Ubuntu lên máy ảo	20.0	1		https://linux-kvm.org/page/Main_Page,https://releases.ubuntu.com/focal/	5b1a2c8f-68ef-4539-91ab-7240b5fb1ad1	\N	f
2024-11-19 07:12:29.589675	2024-12-02 14:54:32.803699	\N	\N	\N	d58a26c4-ac47-4aa4-828d-5a9a8969626b	Trong bài này chúng ta sẽ thực hiện sử dụng các câu lệnh Linux cơ bản	Các lệnh linux cơ bản	50.0	1		https://linux-kvm.org/page/Main_Page,https://releases.ubuntu.com/focal/	\N	Giới thiệu tổng quan về Linux	t
2024-11-30 09:52:32.129154	2024-12-02 14:54:32.803699	\N	\N	\N	3ab17f6e-4b4e-43dc-9c64-6a4f2434ae2a	new lesson	new lesson	3.0	2	\N	\N	\N	new lesson	t
2024-11-30 09:48:27.596245	2024-12-02 14:54:32.803699	\N	\N	\N	da3a1e6e-d562-4a08-bc05-31bb9d7638ce	test lesson2	test lesson22	3.0	3	\N	\N	\N	test lesson	t
2024-11-19 07:18:07.873386	2024-11-19 07:22:56.626163	\N	\N	\N	ed5e671c-3aa1-4146-b1f7-a57e83e9edf1	Trong bài này chúng ta sẽ thực hiện sử dụng các câu lệnh Linux cơ bản	Các lệnh linux cơ bản	20.0	3		https://linux-kvm.org/page/Main_Page,https://releases.ubuntu.com/focal/	\N	Giới thiệu tổng quan về Linux	t
2024-12-07 16:34:04.589921	2024-12-07 16:34:04.589921	\N	\N	\N	96cb98b0-8eab-4bae-bb35-f83a713c741f	Đây là video giới thiệu mở đầu trong series khóa học về ngôn ngữ C++. Trong video này mình sẽ giới thiệu về khóa học.	Giới Thiệu khóa học C++	1.0	1	https://csairs.website/media/eduhub-video/TEST_01		10995d70-7674-41c8-8fbc-ff894489259a	Giới Thiệu khóa học C++	t
2024-11-30 10:31:00.708066	2024-11-30 14:20:49.691796	\N	\N	\N	38b2d166-a32d-4fde-ad4e-dbfb4fc41b87	uiux	uiux	3.0	3	https://csairs.website/media/eduhub-video/efefbba7-a081-4ab2-9903-dafe420aee46	\N	\N	uiux	t
2024-11-19 07:23:54.490863	2024-11-24 06:58:25.169901	\N	\N	\N	0c25fa86-2351-44a2-9a64-2836c9014fc2	Cài đặt linux	Cài đặt linux vào máy ảo	20.0	2		https://linux-kvm.org/page/Main_Page,https://releases.ubuntu.com/focal/	\N	Giới thiệu tổng quan về Linux	f
2024-11-24 06:58:25.169901	2024-11-30 08:36:31.211795	\N	\N	\N	3b5f098d-0957-40af-bcf1-7ef00d3f5fcb	Trong bài này chúng ta sẽ thực hiện tìm hiểu về Docker và cài đặt	Docker là gì? Cách cài đặt	6.0	1		https://linux-kvm.org/page/Main_Page,https://releases.ubuntu.com/focal/	e456c6e6-a990-46ea-8e43-9e84da2f758a	Giới thiệu về Docker	t
2024-11-24 06:58:25.169901	2024-11-30 08:36:31.211795	\N	\N	\N	ed3b876d-b1c1-4895-af58-b08c44b6948a	Trong bài này chúng ta sẽ thực hiện docker hóa một application đơn giản	Docker hóa NodeJS	30.0	2		https://linux-kvm.org/page/Main_Page,https://releases.ubuntu.com/focal/	e456c6e6-a990-46ea-8e43-9e84da2f758a	Docker hóa một application bất kì	f
2024-12-07 16:34:04.589921	2024-12-07 16:34:04.589921	\N	\N	\N	e18cd519-5ec9-4d77-af84-2ee8bdfcb62c	Video tiếp theo này chúng ta sẽ bắt đầu cùng đi vào cài đặt môi trường để làm việc với C++ đó là công cụ Dev-C++.	Cài đặt công cụ viết code - Dev C++ | Install Dev-C++	2.0	2	https://csairs.website/media/eduhub-video/TEST_02		10995d70-7674-41c8-8fbc-ff894489259a	Cài đặt công cụ viết code - Dev C++	t
2024-12-07 16:34:04.589921	2024-12-07 16:34:04.589921	\N	\N	\N	f032bdee-e417-45e9-9ba1-42395510e050	Video này chúng ta sẽ cùng tìm hiểu về khái niệm biến và nhập xuất dữ liệu trong C++.	Khái niệm biến? | Nhập xuất dữ liệu trong C++	7.0	1	https://csairs.website/media/eduhub-video/TEST_04		66668607-6164-45f6-8313-c45cc3de35b1	Khái niệm biến? | Nhập xuất dữ liệu trong C++	f
2024-12-07 16:34:04.589921	2024-12-07 16:34:04.589921	\N	\N	\N	aa9a011f-ad49-4dc3-9321-0f2850e11384	Trong video này chúng ta sẽ tìm hiểu về các kiểu dữ liệu thường gặp trong C++.	Kiểu dữ liệu thường gặp trong C++	5.0	2	https://csairs.website/media/eduhub-video/TEST_05		66668607-6164-45f6-8313-c45cc3de35b1	Kiểu dữ liệu thường gặp trong C++	f
2024-12-01 01:01:33.013467	2024-12-01 01:01:53.680374	\N	\N	\N	42390199-e59e-48bb-870c-f5d85da9854b	qưe	qưe	3.0	6	https://csairs.website/media/eduhub-video/efefbba7-a081-4ab2-9903-dafe420aee46	\N	\N	qưe	f
2024-12-18 07:36:25.916373	2024-12-18 07:36:25.916373	\N	\N	\N	014336dd-764d-4439-8b62-0f9197609ab3	Trong bài này chúng ta sẽ tìm hiểu về Switch case trong C#	Javascript có thể làm được gì?	8.0	1	https://csairs.website/media/eduhub-video/44573aa7-1e08-415b-a811-76c87cd79333	\N	dd98f5b4-84c8-432d-842c-ea267ed6b7bc	Trong bài này chúng ta sẽ tìm hiểu về Switch case trong C#	f
2024-12-07 16:34:04.589921	2024-12-07 16:34:04.589921	\N	\N	\N	50811bf0-b1aa-4093-9fe9-7c8c848a21a1	Trong bài này chúng ta sẽ tìm hiểu về toán tử gán và toán tử số học trong C++.	Toán tử gán và toán tử số học trong C++	10.0	1	https://csairs.website/media/eduhub-video/TEST_08		ec330914-c774-475d-8e19-10e113b9a09a	Toán tử gán và toán tử số học trong C++	f
2024-10-27 09:36:12.893532	2024-10-27 09:36:12.893532	\N	\N	\N	dca3bd40-9730-46b2-8f21-9478e916f198	Ở chương này chúng ta sẽ giới thiệu và làm quen cách chúng ta sẽ học	Bài 1. NodeJS là gì? Giới thiệu sơ về khóa học	15.0	1	https://csairs.website/media/eduhub-video/efefbba7-a081-4ab2-9903-dafe420aee46	http://tailieu.pdf	\N	\N	f
2024-11-30 10:33:30.208456	2024-12-02 14:54:32.803699	\N	\N	\N	4d9dd7bd-5706-4110-92e1-ceca6d0808af	designer223	designer23	3.0	4	https://csairs.website/media/eduhub-video/efefbba7-a081-4ab2-9903-dafe420aee46	\N	\N	designer3333	f
2024-12-18 07:39:34.173949	2024-12-18 07:40:51.851121	\N	\N	\N	0ae8c88b-97d5-4a03-9c86-7966bad43b2f	Cách sử dụng JS trong file HTML | Visual Studio Code	Lời khuyên trước khóa học	2.0	2	https://csairs.website/media/eduhub-video/0ac685de-cfba-4e2d-a9f7-e322c7d7eeb7	\N	dd98f5b4-84c8-432d-842c-ea267ed6b7bc	Trong video tiếp theo này mình sẽ hướng dẫn các bạn cách sử dụng JS trong file HTML | Visual Studio Code.	f
2024-12-18 07:43:06.610388	2024-12-18 07:43:06.610388	\N	\N	\N	685dc2e7-cbba-435b-82f4-819c49154b73	Ở video này chúng ta sẽ bắt đầu đi vào khai báo biến | làm quen với cú pháp trong JavaScript	Khai báo biến | Làm quen với cú pháp trong JavaScript	4.0	3	https://csairs.website/media/eduhub-video/f6439284-30d6-40f7-ae1b-04e8d037e111	\N	dd98f5b4-84c8-432d-842c-ea267ed6b7bc	Ở video này chúng ta sẽ bắt đầu đi vào khai báo biến | làm quen với cú pháp trong JavaScript	f
2024-12-17 03:39:56.301723	2024-12-17 03:39:56.301723	\N	\N	\N	69845c45-ace7-4802-9e89-ce4a317b2514	Video này chúng ta cùng tìm hiểu khái niệm React-DOM là gì? | Tại sao cần React-DOM?	React-DOM là gì? | Tại sao cần React-DOM?	11.0	4	https://csairs.website/media/eduhub-video/a45951fa-6b65-4693-a512-d98d2d1591a9	\N	01c76298-0b97-416b-8378-3fb0e0dacd8a	Video này chúng ta cùng tìm hiểu khái niệm React-DOM là gì? | Tại sao cần React-DOM?	f
2024-12-18 07:45:05.79746	2024-12-18 07:45:05.79746	\N	\N	\N	3d9a146c-b537-4d25-88c0-6cad1f3372d1	Khái niệm IIFE trong JavaScript	Khái niệm IIFE trong JavaScript | JavaScript Nâng Cao	4.0	1	https://csairs.website/media/eduhub-video/8e4e77b3-dc4c-4acf-a53f-a1cf1c705f2a	\N	eed927c6-d275-474c-b00d-7f7dbd261100	Khái niệm IIFE trong JavaScript	f
2024-11-15 09:12:39.831	2024-12-19 04:31:09.836908	\N	\N	\N	59faae67-3257-4987-b60e-af3cd5cbb0fc	Trong bài này chúng ta sẽ thực hiện cài đặt Ubuntu server 20.04 lên KVM	Cài đặt Ubuntu lên máy ảo	3.0	2	https://csairs.website/media/eduhub-video/efefbba7-a081-4ab2-9903-dafe420aee46	https://linux-kvm.org/page/Main_Page,https://releases.ubuntu.com/focal/	a09b2806-0ba2-48ff-ad28-0b9816bc791d	Giới thiệu tổng quan về Linux	t
2024-12-12 08:33:50.129	2024-12-12 08:33:50.129	\N	\N	\N	5b4e362d-5d8f-40b7-ad55-fcf506f665e2	dasdsa	dasdsa	3.0	1	https://csairs.website/media/eduhub-video/440bb626-5841-499d-807a-b14d218e9d35	\N	44fc4c53-8a2c-4cce-97a5-3e006f1ca3f0	dsadsa	f
2024-12-14 13:35:37.308678	2024-12-14 13:35:37.308678	\N	\N	\N	75911fc3-6d2d-4a91-8e75-90644af161fc	Lời khuyên trước khóa học Node Express | Học lập trình cơ bản | Học NodeJS miễn phí	Lời khuyên trước khóa học Node Express | Học lập trình cơ bản | Học NodeJS miễn phí	8.0	1	https://csairs.website/media/eduhub-video/bed4d1d2-8124-4958-b2c8-9794433e10ef	\N	d020f0a6-c175-42fb-b735-681fe8230e9e	Lời khuyên trước khóa học Node Express | Học lập trình cơ bản | Học NodeJS miễn phí\n	t
2024-12-16 03:52:17.225362	2024-12-16 03:52:17.225362	\N	\N	\N	603ec7e0-9169-4e95-9978-054f12a31853	Test sáng 16/12/2024	Test sáng 16/12/2024	8.0	1	https://csairs.website/media/eduhub-video/1b9a652e-272d-4351-838a-1f1f6d3b1645	\N	15caa99b-1a83-4585-8aea-90a370e358b4	Test sáng 16/12/2024	f
2024-12-17 03:28:46.211098	2024-12-17 03:28:46.211098	\N	\N	\N	57061afb-2946-45eb-ad24-470767c4ad98	Trong video này chúng ta sẽ tìm hiểu về cách một thư viện mã nguồn mở (open source) viết bởi Javascript được lưu trữ và phân phối như thế nào (thư viện React cũng không là ngoại lệ).	Thêm React vào Website | Github, NPMJS, UNPKG là gì?	15.0	2	https://csairs.website/media/eduhub-video/11d35d31-b1ed-434c-b6c7-8c519989c0b2	\N	01c76298-0b97-416b-8378-3fb0e0dacd8a	Trong video này chúng ta sẽ tìm hiểu về cách một thư viện mã nguồn mở (open source) viết bởi Javascript được lưu trữ và phân phối như thế nào (thư viện React cũng không là ngoại lệ).	f
2024-12-17 03:22:28.511088	2024-12-17 03:22:28.511088	\N	\N	\N	578a8c6e-147b-4750-8cc8-195b860a61a7	Ở video này chúng ta sẽ cùng nhau tìm hiểu về SPA/MPA là gì? | Khái niệm SPA	SPA/MPA là gì | Khái niệm SPA	22.0	2	https://csairs.website/media/eduhub-video/0a2456f3-7d71-43ca-bba3-f4865fb1c1c3	\N	e1bbd8f3-4dff-44dd-bfbd-abbe4e50bd88	Ở video này chúng ta sẽ cùng nhau tìm hiểu về SPA/MPA là gì? | Khái niệm SPA	f
2024-12-16 16:34:44.489	2024-12-16 16:41:55.527	\N	\N	\N	6b4251a9-2209-4542-b1d6-8e64a22a8caa	Trong video này chúng ta sẽ tìm hiểu C# là gì	C# là gì	5.0	1	https://csairs.website/media/eduhub-video/613e323e-6b90-4b8f-a6b7-2446d23e0d4d	\N	b5fbea82-3bbb-436f-abc0-d3bfb5ddc19c	Đây là video giới thiệu mở đầu trong series khóa học về ngôn ngữ C#	f
2024-12-16 16:39:35.109	2024-12-16 16:42:04.803	\N	\N	\N	65eae4aa-4f6e-4f47-b511-2aa65f9db31f	Video tiếp theo này chúng ta sẽ bắt đầu cùng đi vào tìm hiểu Cấu trúc lệnh cơ bản trong C#	Cấu trúc lệnh cơ bản	23.0	2	https://csairs.website/media/eduhub-video/80947163-f2a0-46ab-87f2-1e64248fe8b0	\N	b5fbea82-3bbb-436f-abc0-d3bfb5ddc19c	Cấu trúc lệnh cơ bản trong C#	f
2024-12-16 16:51:14.559	2024-12-16 16:51:14.559	\N	\N	\N	6b9bafa8-a98b-419f-8c02-3a231fcd971d	Ở video bài học này chúng ta sẽ tìm hiểu về Nhập xuất cơ bản trong C#	Nhập xuất cơ bản	30.0	1	https://csairs.website/media/eduhub-video/8e6e3f71-2bf8-413e-8182-bdef1a4fefa5	\N	52ed70d9-73cc-4894-b286-b36b411c3716	Ở video bài học này chúng ta sẽ tìm hiểu về Nhập xuất cơ bản trong C#	f
2024-12-16 17:44:09.34	2024-12-16 17:44:09.34	\N	\N	\N	fe29371c-36c1-4761-8de1-64833ea14157	Bài này chúng ta sẽ cùng học về Biến trong C#	Biến trong C#	25.0	2	https://csairs.website/media/eduhub-video/6b61049e-239e-4553-b9c0-a697fcb426f5	\N	52ed70d9-73cc-4894-b286-b36b411c3716	Bài này chúng ta sẽ cùng học về Biến trong C#	f
2024-12-16 17:51:26.192	2024-12-16 17:51:26.192	\N	\N	\N	faff57b5-3ed7-42f5-9979-64d1f9142656	Trong bài này chúng ta sẽ tìm hiểu về Kiểu dữ liệu trong C#	Kiểu dữ liệu trong C#	21.0	1	https://csairs.website/media/eduhub-video/15cf630d-2a8c-4f5c-8b71-71bb84d93371	\N	d4cddf43-6ad3-489d-99b1-c29a56cc6e0b	Trong bài này chúng ta sẽ tìm hiểu về Kiểu dữ liệu trong C#	f
2024-12-16 12:51:05.791388	2024-12-16 12:51:05.791388	\N	\N	\N	03c4b9e0-1655-47fc-8eb4-124bd384a1b2	Trong video đầu tiên của khóa học JavaScript cơ bản này mình sẽ chia sẻ với các bạn Javascript có thể làm được gì?	Javascript có thể làm được gì?	8.0	1	https://csairs.website/media/eduhub-video/5ee5ac1a-7bcc-4f67-846a-290842ac703f	\N	a2fc532a-39f0-4426-87de-b8316838bed2	Trong video đầu tiên của khóa học JavaScript cơ bản này mình sẽ chia sẻ với các bạn Javascript có thể làm được gì?	f
2024-12-16 14:07:24.316294	2024-12-16 14:07:24.316294	\N	\N	\N	7cda3b79-e5f2-4b43-80cc-13fc80898516	Video thứ 2 này là chia sẻ của mình tới các bạn về những lưu ý và lời khuyên trước khóa học	Lời khuyên trước khóa học	4.0	2	https://csairs.website/media/eduhub-video/8f7cda8b-6698-413e-a79c-b98a11b216f8	\N	a2fc532a-39f0-4426-87de-b8316838bed2	Video thứ 2 này là chia sẻ của mình tới các bạn về những lưu ý và lời khuyên trước khóa học	f
2024-12-16 07:43:23.466	2024-12-16 08:42:43.024	\N	\N	\N	c6ab8cd0-d085-445d-b603-5b09b5ce7d05	Đây là video mở đầu trong chuối video khóa học ReactJS, video này mình sẽ giới thiệu tới các bạn ReactJS là gì và tại sao nên học ReactJS	ReactJS là gì | Tại sao nên học ReactJS	11.0	1	https://csairs.website/media/eduhub-video/b1e49dd6-458f-4732-88d3-7aca2ed807ab	\N	e1bbd8f3-4dff-44dd-bfbd-abbe4e50bd88	Đây là video mở đầu trong chuối video khóa học ReactJS, video này mình sẽ giới thiệu tới các bạn ReactJS là gì và tại sao nên học ReactJS	f
2024-12-17 03:24:56.530884	2024-12-17 03:24:56.530884	\N	\N	\N	31e26012-cb9e-4639-8d6a-1d8c458242bb	Trong video của chuỗi bài học về reactJS này chúng ta sẽ tìm hiểu document.createElement() để làm gì	document.createElement() để làm gì | Phương thức createElement	10.0	1	https://csairs.website/media/eduhub-video/51df25db-a084-49c7-bd19-519a35837296	\N	01c76298-0b97-416b-8378-3fb0e0dacd8a	Trong video của chuỗi bài học về reactJS này chúng ta sẽ tìm hiểu document.createElement() để làm gì	f
2024-12-17 03:36:04.979901	2024-12-17 03:36:04.979901	\N	\N	\N	d8707165-253c-44e6-bd8c-f11ee91199d1	Trong video này chúng ta sẽ đi vào tìm hiểu về một phương thức createElement nữa, đó là phương thức React.createElement() của thư viện ReactJS	Phương thức React.createElement() của thư viện ReactJS	15.0	3	https://csairs.website/media/eduhub-video/a9b1dc75-1320-47f4-b3b4-a87723431959	\N	01c76298-0b97-416b-8378-3fb0e0dacd8a	Trong video này chúng ta sẽ đi vào tìm hiểu về một phương thức createElement nữa, đó là phương thức React.createElement() của thư viện ReactJS	f
2024-12-18 07:47:26.777962	2024-12-18 07:47:26.777962	\N	\N	\N	de14fa8b-1431-4064-8304-1293b21cbb0d	Trong video của chuỗi bài học về javascript nâng cao này, mình sẽ cùng các bạn tìm hiểu sâu hơn về kiến thức Scope trong JavaScript | Phạm vi truy cập trong JavaScript	Scope trong JavaScript | Phạm vi truy cập trong JavaScript	36.0	2	https://csairs.website/media/eduhub-video/a82ff94f-704b-4ca0-ab3a-c4a50416d528	\N	eed927c6-d275-474c-b00d-7f7dbd261100	Trong video của chuỗi bài học về javascript nâng cao này, mình sẽ cùng các bạn tìm hiểu sâu hơn về kiến thức Scope trong JavaScript | Phạm vi truy cập trong JavaScript	f
2024-12-18 07:52:39.187781	2024-12-18 07:52:39.187781	\N	\N	\N	e237b28d-f538-4c88-b1db-016237f5b771	Video này chúng ta sẽ tới với khái niệm về tính bao đóng trong JS đó là Closure trong JavaScript	Closure trong JavaScript	11.0	1	https://csairs.website/media/eduhub-video/fdcd9888-1598-4a6a-9e7d-2196c19afb56	\N	dec6d730-cdbf-412d-9bc3-5b4bfeb503f9	Video này chúng ta sẽ tới với khái niệm về tính bao đóng trong JS đó là Closure trong JavaScript	f
2024-12-18 07:55:29.068078	2024-12-18 07:55:29.068078	\N	\N	\N	3808a5cf-c5bb-430d-94d0-0f59d8749557	Đây là video mình sẽ cùng các bạn tìm hiểu sâu hơn về "use strict" hay strict mode trong Javascript	"use strict" hay strict mode trong Javascript	30.0	2	https://csairs.website/media/eduhub-video/e1a2039c-f6eb-4950-83b0-6b195762a3c4	\N	dec6d730-cdbf-412d-9bc3-5b4bfeb503f9	Đây là video mình sẽ cùng các bạn tìm hiểu sâu hơn về "use strict" hay strict mode trong Javascript	f
2024-12-18 07:59:29.344339	2024-12-18 07:59:29.344339	\N	\N	\N	80219b78-c4b2-4e01-b14e-a32b89ec6db9	Trong bài học này chúng ta sẽ tìm hiểu về từ khóa "this", This keyword trong JavaScript	This keyword trong JavaScript	25.0	3	https://csairs.website/media/eduhub-video/fddff87e-d744-4669-84bb-31da97cbeb21	\N	dec6d730-cdbf-412d-9bc3-5b4bfeb503f9	Trong bài học này chúng ta sẽ tìm hiểu về từ khóa "this", This keyword trong JavaScript	f
2024-12-19 04:26:41.214938	2024-12-19 04:30:57.735463	\N	\N	\N	5a9f92db-b826-4345-b671-c5ff4ad55260	sadasdassadas	sdadsasdad	3.0	1	https://csairs.website/media/eduhub-video/2e8d111d-05f7-40e9-878b-3d12ba66e3e8	\N	68aaefe1-6ad6-4a06-bf1f-993c1f68c1a0	đasadasdsadsadasdasdas	t
2024-12-03 05:47:54.97	2024-12-19 04:31:09.836908	\N	\N	\N	416d6d9a-1823-4852-bd97-1d51f36518d4	Câu lệnh Linux cơ bản	Bài 2: Câu lệnh Linux cơ bản	3.0	1	https://csairs.website/media/eduhub-video/005a2c5e-3b70-4242-8fd8-a8561cfdcf5f	\N	a09b2806-0ba2-48ff-ad28-0b9816bc791d	Bạn có biết:\nKhóa học "Cẩm nang A-Z Illustrator cho Designer" chính là dành cho bạn, người...\nĐam mê yêu thích đồ họa, nhiếp ảnh, thiết kế sản phẩm.\nĐang đi làm cần bổ sung, chuẩn hóa kiến thức, tăng khả năng hoàn thiện và thăng tiến trong nghề nghiệp\nSinh viên chuyên ngành marketing, truyền thông, mỹ thuật, thiết đồ họa, thời trang, họa viên… cần kỹ năng sử dụng thành thạo phần mềm illustrator để  phục vụ cho công việc và học thiết kế...\nĐang làm việc trong lĩnh vực marketing, truyền thông, kinh doanh,…\nVà bất cứ ai yêu thích công việc sáng tạo và thiết kế với phần mềm Adobe Illustrator!\nHãy tham gia ngay khóa học "Cẩm nang A-Z Illustrator cho Designer" tại Unica!\n   ✔️ Khóa học do giảng viên Phạm Đức Huy trực tiếp hướng dẫn. Khóa học sẽ giúp bạn có được những kiến thức và kỹ năng nền tảng nhất để các bạn tiến gần hơn và trở thành một Graphic Designer, Web Designer, Game UI UX Designer hoặc Motion Graphic Designer ngay tại nhà!\n   ✔️ Khóa học là nền tảng để các bạn hiểu sâu hơn về bản chất công cụ của phần mềm Adobe Illustrator, từ đó các bạn dễ dàng xin được việc tại các công ty thiết kế lớn ở Việt Nam.\n   ✔️ Khóa học được soạn từ những dự án thực tế với nhiều khách hàng, vì vậy tính ứng dụng của khóa học luôn gắn liền với thị trường hiện tại. Học viên có thể ứng dụng ngay những kiến thức và kỹ năng mình học được vào trong công việc hiện tại của bản thân.\nNội dung khóa học cụ thể:\nPhần 1: Giới thiệu và hướng dẫn tạo các hình khối\nPhần 2: Các tính năng của Shapes và bài tập thực hành\nPhần 3: Hướng dẫn các công cụ Drawing Tools, Pen Tool và Brushes\nPhần 4: Hướng dẫn các công cụ nâng cao trong thiết kế đồ họa\nTrở thành nhà thiết kế chuyên nghiệp với phần mềm Ai ngay hôm nay với khóa học "Cẩm nang A-Z Illustrator cho Designer" tại EduHub thôi nào!	f
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
7	1729962626805	Migrations1729962626805
8	1730017759516	Migrations1730017759516
9	1730018420376	Migrations1730018420376
10	1730019829516	Migrations1730019829516
11	1730020495209	Migrations1730020495209
12	1730888776881	Migrations1730888776881
13	1731637850212	Migrations1731637850212
15	1731639534929	Migrations1731639534929
16	1731655144938	Migrations1731655144938
17	1731661583919	Migrations1731661583919
18	1731661745059	Migrations1731661745059
19	1731661814071	Migrations1731661814071
20	1731997401354	Migrations1731997401354
21	1731998037639	Migrations1731998037639
22	1731998196936	Migrations1731998196936
23	1731999944339	Migrations1731999944339
24	1732433056501	Migrations1732433056501
25	1732526038776	Migrations1732526038776
26	1732533862464	Migrations1732533862464
27	1732535984945	Migrations1732535984945
28	1732536665765	Migrations1732536665765
29	1732537047196	Migrations1732537047196
30	1733231764361	Migrations1733231764361
31	1733233667896	Migrations1733233667896
32	1733381886397	Migrations1733381886397
33	1733386810153	Migrations1733386810153
34	1733904406028	Migrations1733904406028
35	1733990708328	Migrations1733990708328
36	1733991015708	Migrations1733991015708
37	1733992115647	Migrations1733992115647
38	1734258007068	Migrations1734258007068
39	1734521816276	Migrations1734521816276
\.


--
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.notification (create_at, update_at, create_by, update_by, delete_at, id, content, title, "isRead", user_id, role, "notiType") FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.orders (create_at, update_at, create_by, update_by, delete_at, id, total_price, payment_id, status, student_id, customer_fullname, customer_email, customer_phone) FROM stdin;
2024-12-06 16:59:01.159358	2024-12-06 16:59:01.159358	\N	\N	\N	ac774b81-99f5-4b6a-b60f-f5ed1ae40cfe	120000	a8ccc849-4d8e-4218-a61e-c79047ddba01	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-11-25 12:17:56.679849	2024-11-25 12:17:56.679849	\N	\N	\N	00ee470c-5ef1-4a59-bba7-0b9bcfc2df5f	120000	c4af2582-c56c-453f-8676-cdd325920648	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-05 08:11:29.966151	2024-12-05 08:11:29.966151	\N	\N	\N	00d09912-45d9-4c5f-bcfc-8e6522c6eab6	120000	2e507be4-124b-4c4c-9962-73bddacfd940	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-05 08:22:40.604637	2024-12-05 08:22:40.604637	\N	\N	\N	e94b2041-6c17-40a2-adef-3039b962a29c	120000	54454b6d-3110-4d04-995a-a33edd4b6011	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-05 08:29:32.925797	2024-12-05 08:30:27.757497	\N	\N	\N	03792e58-92a9-4cc0-be00-2289272bc03d	120000	376b3970-e064-46c6-98eb-8134181926ab	PAID	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-05 12:25:14.541728	2024-12-05 12:25:14.541728	\N	\N	\N	ab95a706-edca-467e-a45d-423a56d4fc41	120000	ddcadace-81ff-4c22-9915-ca1bba7d6619	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-05 13:02:44.337236	2024-12-05 13:02:44.337236	\N	\N	\N	8588ab51-61f7-432a-9c0c-ef77ccbf3d84	120000	2630b3a0-140e-4395-898d-3c4c590fefdd	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-05 14:19:09.25272	2024-12-05 14:19:09.25272	\N	\N	\N	6fc89910-65ee-497a-b7af-a4b8251f62ec	120000	b8a3ea66-64ac-450b-9a89-3039cc37dcf9	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 06:11:32.837108	2024-12-06 06:11:32.837108	\N	\N	\N	231c475e-83e6-402f-9177-f4946cc194f6	120000	3fcd769b-470c-4284-8104-2415b8d3fe55	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 06:11:36.127733	2024-12-06 06:11:36.127733	\N	\N	\N	68f1d2b0-13a6-4dd8-976c-0cc8c3ddff03	120000	b3db6f7d-3657-427a-b328-8ca342abcd79	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 06:14:01.93323	2024-12-06 06:14:45.534226	\N	\N	\N	7f563a52-b204-4270-965e-44081d9d386d	120000	f3349c57-5f31-4582-9e1b-21fd3166df3c	PAID	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 06:17:23.687237	2024-12-06 06:18:20.116987	\N	\N	\N	1a8935ec-10e6-4ce3-90bb-8944ddc60a2e	120000	91c5ce58-1385-4b26-abb8-ab6ce1c899ce	PAID	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 07:37:09.78828	2024-12-06 07:37:09.78828	\N	\N	\N	d2cc87fe-2870-4f05-8e30-d51e37add1c1	120000	fbc3f79c-a31e-441b-8515-24024efb7364	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 07:57:17.818742	2024-12-06 07:57:17.818742	\N	\N	\N	a60f80c8-7779-48ae-a6d6-9fb349771c12	0	ae9349eb-ef63-4af4-9acd-ae710c7b668e	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 07:58:12.297804	2024-12-06 07:58:12.297804	\N	\N	\N	212e5d75-fdab-4963-8aad-66a87938357e	120000	364d22dd-56e5-47b0-a03c-5d662b4bd506	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 07:59:40.163067	2024-12-06 07:59:40.163067	\N	\N	\N	6a641bc6-6723-4517-af15-97c29977e6d4	0	88c18b1c-4b9f-4c04-82eb-6da4af9e9f36	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 14:56:35.276471	2024-12-06 14:56:35.276471	\N	\N	\N	5cc57aa1-098e-49a7-ad74-6ffa3e6a2755	0	8ded438a-9fc8-49d0-8dfb-4b8adf9aa52e	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 15:00:33.000906	2024-12-06 15:00:33.000906	\N	\N	\N	755e7c02-552c-4d84-9b94-48da39c62a50	0	5086590a-3528-4c09-b87d-0bc80283f668	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 15:02:58.725327	2024-12-06 15:02:58.725327	\N	\N	\N	5bdca9d2-8938-4cf0-a39d-f083fdac5ea2	120000	de7e054f-cdef-41b6-bedc-7975edfcb169	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 15:03:36.348987	2024-12-06 15:03:36.348987	\N	\N	\N	03ab971d-4dc3-4bde-b092-4b78a470eaee	120000	9a8c8a71-1ae6-454f-be3c-7132e2b0db02	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 15:07:41.090337	2024-12-06 15:07:41.090337	\N	\N	\N	3efd82da-8047-48a6-bb9a-3f8665bf0c3d	120000	13274f8c-6bb5-4f52-8487-bb6b6a71e6f9	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 15:34:07.858172	2024-12-06 15:34:07.858172	\N	\N	\N	78291440-9793-4eed-980b-2f09b8448363	120000	18ac8f6c-1789-4603-becb-cf7342d4d6c4	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 15:40:23.469659	2024-12-06 15:40:23.469659	\N	\N	\N	9dc18bd5-c1f9-4597-96ed-9cb13d9cce41	120000	d0e0b9a7-9245-4b76-adca-e5df994ccce6	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 15:40:25.951082	2024-12-06 15:40:25.951082	\N	\N	\N	8e44f4f2-22cb-4344-b4b0-37824be3e07a	120000	8bb141f0-5214-4186-a930-ee3f1c5aab47	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 15:40:43.515513	2024-12-06 15:40:43.515513	\N	\N	\N	54a89ebd-38d1-4565-bf4e-1b3788992096	120000	9e94a83c-43c7-4cff-b568-169c9a76875d	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 15:41:24.003253	2024-12-06 15:41:24.003253	\N	\N	\N	b573d2d1-d46f-4cf3-9ec8-d77ed8cd537a	120000	6ef04b0e-d672-460b-9003-fe56461079b1	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 15:42:04.114872	2024-12-06 15:42:04.114872	\N	\N	\N	7b015809-b6e5-4332-b11e-7929167f0cf7	120000	b478ddd0-9530-4bca-9000-a485985889b6	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 15:42:56.899162	2024-12-06 15:42:56.899162	\N	\N	\N	40d8c2fb-3866-416c-b057-071e45bf1d3a	120000	08ea80f4-8a82-4d5f-b090-1dbfaec93f07	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 15:44:13.934879	2024-12-06 15:44:13.934879	\N	\N	\N	982a27fb-f82b-49fc-bcc6-65220881dd03	120000	3ee4be78-6433-40c5-ab73-d1380669b25a	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 15:45:01.248047	2024-12-06 15:45:01.248047	\N	\N	\N	779d411b-f177-4c8d-8378-c772d680a2fa	120000	b9c3e643-a9e6-4810-a366-f8221864f3f9	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 15:45:14.862765	2024-12-06 15:45:14.862765	\N	\N	\N	c330d830-bd4c-4d2f-b25f-a4a997465283	120000	ca3b4949-8b97-4afa-923e-321d57cad846	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 15:52:55.52253	2024-12-06 15:52:55.52253	\N	\N	\N	a38cac22-e7c5-46ab-9d59-f5fe3ff41bd5	120000	5670383e-11cf-4754-9e34-faa3e93a3585	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 15:53:42.151673	2024-12-06 15:53:42.151673	\N	\N	\N	f3a595af-8130-442b-84de-96ac76bd5d82	120000	f190bcfc-c323-4fff-8056-9f056286b638	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 15:56:33.875284	2024-12-06 15:56:33.875284	\N	\N	\N	25117fc1-0c19-40a8-8983-d3b9fa32c40d	120000	e9c7b2e1-f6e6-4c92-b9f4-8dc681774838	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 15:58:27.227696	2024-12-06 15:58:27.227696	\N	\N	\N	dabf279d-a8c4-4ec1-bb6c-b81f4531cc34	120000	ca324496-63d4-491c-8ef6-f6dc2e9b01e5	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 15:59:02.678979	2024-12-06 15:59:02.678979	\N	\N	\N	d0876d80-7c09-4612-99ec-db05351457c0	120000	220bf7b3-2e60-460f-8e3b-76baf507d44b	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 16:01:02.196409	2024-12-06 16:01:02.196409	\N	\N	\N	f739ac47-88b4-4261-a0da-c57762b84742	120000	9d368a53-226e-4941-bb18-ef02146d0461	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 16:02:36.409118	2024-12-06 16:02:36.409118	\N	\N	\N	1a2d3a73-b8cf-408d-a1d6-ab0e7f7965ce	120000	d0d48a51-a490-44a9-bbb7-a81033caa51f	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 16:06:38.431651	2024-12-06 16:06:38.431651	\N	\N	\N	4e8d2b5f-a655-4986-a5fb-ca9cbe0efc0a	120000	a22ba818-3d71-4016-81e1-29df482cdcfe	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 16:08:07.801241	2024-12-06 16:08:07.801241	\N	\N	\N	cb53aa4b-8f16-40f0-925a-429bf16623b5	120000	d14911ff-36df-43ff-9ca7-3d8f10eb1045	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 16:09:18.610525	2024-12-06 16:09:18.610525	\N	\N	\N	89cc6fa6-9f19-42e1-85c7-abcb99653459	120000	47f44314-0144-41b4-8211-e1f68d0ab9d7	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 16:12:46.507488	2024-12-06 16:12:46.507488	\N	\N	\N	7f0e1959-ede9-42f4-a4dd-d4f757897415	120000	8d576d95-4f99-460e-9c78-962e6ee00191	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 16:14:35.822949	2024-12-06 16:14:35.822949	\N	\N	\N	f1e1da98-e0bc-49ef-a0eb-e67141595c5b	120000	1b9767a6-ce94-4b71-be4e-ffa455830f0b	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 16:28:43.658237	2024-12-06 16:28:43.658237	\N	\N	\N	7701877c-0f2d-42aa-a4d8-c3deac495834	120000	4729db5f-bce8-4ba9-adae-d6d1a82757f8	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 16:35:16.604939	2024-12-06 16:35:16.604939	\N	\N	\N	dfc655db-acdb-4f0e-8a2f-46a7506593ab	120000	752ea456-9ba5-49ba-ac70-76f6d319ea21	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 16:42:25.119345	2024-12-06 16:42:25.119345	\N	\N	\N	0d3be0d0-dbab-4017-8122-8848c8b9ca2b	120000	f4f7a863-a2f8-4ba3-9f4e-d50a73b28a8c	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 16:43:16.343661	2024-12-06 16:43:16.343661	\N	\N	\N	03fdff91-ad33-4d6f-aab3-bcacc1823a14	120000	f52ebe3c-676a-4611-b9cd-205a104e033b	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 16:48:54.544962	2024-12-06 16:48:54.544962	\N	\N	\N	7e362601-f9b5-481b-88f8-b8df73a54df4	120000	739b701e-ab21-45b4-8a19-63cd046d0694	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 16:49:30.044224	2024-12-06 16:49:30.044224	\N	\N	\N	b2a83b53-51c5-4489-bd2a-1cc680ae1528	120000	2c98c30f-94f5-4883-9df9-425a143bf340	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 16:51:00.675428	2024-12-06 16:51:00.675428	\N	\N	\N	5529cd5a-ec89-49ef-b9d1-512ee5155130	120000	456886e8-ea10-4047-9476-389635595cd7	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 16:53:18.446358	2024-12-06 16:53:18.446358	\N	\N	\N	29d3e729-a5ad-4238-92fb-2b96fbc90794	120000	f294c4ae-040b-4b17-aa49-aa7bf843b7ca	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 16:54:41.074394	2024-12-06 16:54:41.074394	\N	\N	\N	978716c0-283a-4cdc-b886-103da7f52cbb	120000	89d5da77-b943-42cb-a545-437b7296fe6d	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 16:58:00.316199	2024-12-06 16:58:00.316199	\N	\N	\N	fc4b940d-07e4-4cfb-8646-961482a9b0eb	120000	f88ea687-9c05-4793-8d60-eb525ebbdde4	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 16:58:54.832047	2024-12-06 16:58:54.832047	\N	\N	\N	b53b2c5f-81f7-4400-9aef-f86596a204bd	120000	01e79ace-6703-4244-a9b1-94137586b96e	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 17:03:09.512077	2024-12-06 17:03:09.512077	\N	\N	\N	5f67e08d-0f64-448b-b20e-388e77e8fa9f	120000	aa4921a2-c576-4283-8b2a-87b23197434a	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 17:05:20.181381	2024-12-06 17:05:20.181381	\N	\N	\N	f59246c4-f5a6-4d8c-8649-7c128ecc4bab	120000	a7a58f25-1460-49f5-8451-9a226e4caddf	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 17:07:40.610904	2024-12-06 17:07:40.610904	\N	\N	\N	9fbca765-3ad3-43ad-92c5-4c4bdf898e90	120000	cc2ec717-1f34-48a5-87dd-e76aa801cbbd	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 17:09:21.205762	2024-12-06 17:09:21.205762	\N	\N	\N	32459252-007d-4d3d-bb10-0c67d042b628	120000	98dcb610-9f61-48cb-8eb6-073d7a31dcd8	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 17:17:02.665376	2024-12-06 17:17:02.665376	\N	\N	\N	97bd1326-da1a-42ce-9615-5ad87217b9cb	120000	83f2c11c-98be-443f-9a98-d86b592f8015	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 17:19:10.628306	2024-12-06 17:19:10.628306	\N	\N	\N	bd00fc31-0a32-4c9c-92c3-d30d4c1aa4fb	120000	2bb29a9a-280d-4096-af90-282282a41935	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 17:19:47.696605	2024-12-06 17:19:47.696605	\N	\N	\N	dfee518c-73bf-424e-993f-61237653af67	120000	ad1155c3-bdae-47eb-9134-cddfc445de0f	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 17:27:44.122776	2024-12-06 17:27:44.122776	\N	\N	\N	5cbd01d3-d89b-4a47-991e-e7313e13b0df	120000	49d6df6e-fab3-410f-be0a-d2cd6bcb9d05	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 17:28:42.00356	2024-12-06 17:28:42.00356	\N	\N	\N	d8977890-8f61-4076-a7b3-cfc939076e3c	120000	a8298d5e-7b3e-4858-bac6-1a5813ddbfb0	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-06 17:49:10.083986	2024-12-06 17:49:10.083986	\N	\N	\N	1ef99036-7b05-4edd-8e1a-beabe6c87e00	120000	560d8f4e-0920-4e7d-b3b8-63558c234679	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-07 03:55:22.745299	2024-12-07 03:55:22.745299	\N	\N	\N	b1c449d2-fc69-42fd-9d39-24fe0e956cd5	120000	26f8da75-0739-4cef-9405-ef733084978a	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-07 04:25:12.620195	2024-12-07 04:25:12.620195	\N	\N	\N	234fe484-a349-435f-b9d6-8c133a1bbb61	120000	fad4d264-f6e5-48f7-add2-c2d5a670e007	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-07 04:26:47.031441	2024-12-07 04:26:47.031441	\N	\N	\N	47cc862c-cca5-4fb8-a601-48cddac14537	120000	499d7099-167b-432e-9e13-b5a133abacd5	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-07 04:53:30.46554	2024-12-07 04:53:30.46554	\N	\N	\N	cbdbc453-b141-4a9c-8f99-4ef7f1cf7b99	120000	0828ad89-56b5-4bde-b06e-1775724eac58	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-07 04:54:52.041815	2024-12-07 04:54:52.041815	\N	\N	\N	8fff5ede-9bbd-45d8-8a0d-7f25ce5cfa21	120000	d034dad3-f835-4247-8789-a4fe33b5491b	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-07 05:06:20.984844	2024-12-07 05:06:20.984844	\N	\N	\N	b990de7e-449b-480f-9e6b-66f75093d6f1	120000	a7140bca-6f42-43b0-afe7-f77aabffdbf6	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-07 05:13:08.011292	2024-12-07 05:13:08.011292	\N	\N	\N	a505b200-acc5-4df8-83b5-83bbcf9ca76a	120000	143d5a2f-9e24-4af0-aca7-f5d52820a1e8	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-07 05:18:17.246237	2024-12-07 05:18:17.246237	\N	\N	\N	1cd95d1a-afec-4471-93fd-1f71822590f4	120000	2d5329cd-93aa-45f2-9bee-4d481f3bb0fb	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-07 05:20:00.418217	2024-12-07 05:20:00.418217	\N	\N	\N	6bd9b4ea-6441-4504-9331-46ca53b1e07d	120000	7bf74427-70f6-494f-8b03-ad1154846476	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-07 05:21:15.643381	2024-12-07 05:21:15.643381	\N	\N	\N	ab7286ce-e515-43dc-8808-78b0a776aec1	120000	1e5f253d-f2aa-4b82-9dda-0feb39f19b66	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-07 05:22:36.351334	2024-12-07 05:22:36.351334	\N	\N	\N	b2ed973b-2879-49f8-b972-46106f1acc25	120000	6d1da41a-b1ab-44ea-a6b3-b54a38977acb	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-07 05:24:20.768365	2024-12-07 05:24:20.768365	\N	\N	\N	a0ef2a41-df44-4c54-9c05-ac285ba60053	120000	ca04caeb-a201-4cbe-8070-803359809660	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-07 05:25:51.771426	2024-12-07 05:25:51.771426	\N	\N	\N	b21303f1-8d35-469a-a9ee-1b509a105516	120000	5f79222f-ceef-4499-bb96-6fa5ba337f40	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-07 05:29:44.602278	2024-12-07 05:29:44.602278	\N	\N	\N	895901dd-d6c2-4d68-8187-c21b756addf6	120000	577d8b92-2d62-4a88-80bb-927748e021e9	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-07 05:31:26.819035	2024-12-07 05:31:26.819035	\N	\N	\N	2675b6fc-d0e7-437a-94fb-26ae88eb32a0	120000	b9b95233-c4f8-4614-a03e-2bb662bc56cf	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-11 09:05:03.099711	2024-12-11 09:21:10.806354	\N	\N	\N	94a7a9d5-541d-4eb2-acf4-9ae1ab010949	120000	baf8ce46-d405-4544-aa82-d2818b0d136c	PAID	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 06:19:28.227986	2024-12-12 06:19:28.227986	\N	\N	\N	7cee4d37-c439-48ae-866d-08b172f3aa5a	120000	a0fd588b-eca5-4635-93e0-b0bc5489cf34	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 06:25:10.296665	2024-12-12 06:25:10.296665	\N	\N	\N	17fff2fa-527c-438e-8160-9de4520c071e	120000	9c5eaadc-87fa-43c8-8541-d44574711499	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 06:27:03.592468	2024-12-12 06:27:03.592468	\N	\N	\N	c6751389-4059-4fa4-9bd8-c4e26920447e	120000	c2250316-eb78-4b67-8fe8-881a28564aaf	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 06:29:19.088449	2024-12-12 06:29:19.088449	\N	\N	\N	91a390b1-8594-436c-be26-eb1553dcc67f	120000	567e5d25-b80a-471d-ab9e-42c1daa4073e	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 06:33:49.569397	2024-12-12 06:33:49.569397	\N	\N	\N	b6a8a922-c329-47a8-ab60-0681a3069d22	120000	1cb09359-6cf1-4514-ac8e-3ef384c4667e	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 06:34:29.650501	2024-12-12 06:34:29.650501	\N	\N	\N	94fba3f0-04db-43bd-bdfc-37ccc338a768	120000	da3dabb9-3e88-4020-b1a2-07db16fb3e80	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 06:35:17.946457	2024-12-12 06:35:17.946457	\N	\N	\N	ac544c56-f8bd-41db-afe8-0340aff6f445	120000	ebcb43f9-3260-4fae-84b2-2fcd8d246e21	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 06:36:57.561504	2024-12-12 06:36:57.561504	\N	\N	\N	6f00207e-41dc-4254-ab5a-a0b51cb23ada	120000	9d6b0815-05bb-4b29-ba9b-4ecee878d664	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 06:39:23.125563	2024-12-12 06:39:23.125563	\N	\N	\N	15ac9986-532f-4f5b-b7f2-74ec73eab619	120000	fdef3f90-99fa-445a-9286-d037508bb287	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 06:45:53.946337	2024-12-12 06:45:53.946337	\N	\N	\N	42338b49-d43d-43ea-bd7f-35ddc47c0ad3	120000	1a79a2fe-9246-4007-a31c-3afe292f20d7	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 06:52:51.246754	2024-12-12 06:52:51.246754	\N	\N	\N	65d43415-8170-4c7c-bdfa-254b87a5f749	120000	00a6f8e8-087e-43f4-b5c9-550aa27f62f4	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 07:08:54.051643	2024-12-12 07:08:54.051643	\N	\N	\N	f2585d84-a48b-4e03-9461-142af2b3fee5	120000	3b47cc0f-cc98-470c-a299-2fbc8e7e417e	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 07:10:27.103923	2024-12-12 07:10:27.103923	\N	\N	\N	f166d986-5f12-489e-9c50-8b3039f823c5	120000	caa99fc6-84a3-4876-a5a4-95b7456a5f5a	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 07:11:17.883161	2024-12-12 07:11:17.883161	\N	\N	\N	c357e785-f5bb-494d-b13a-16a3ac394ab1	120000	ef05ef6e-d975-4c49-a9fa-cc67e2e41f74	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 07:11:45.64711	2024-12-12 07:11:45.64711	\N	\N	\N	0a731b8e-cbd4-45d4-a4bc-291ab263024e	120000	8fa06c6f-a926-49c7-8fdf-8f1911c89781	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 07:12:18.990999	2024-12-12 07:12:18.990999	\N	\N	\N	d22cd741-893b-426e-8c6b-bd6f16fb1f60	120000	bd98df09-6e27-4c01-ad93-30c53ae1ef66	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 07:13:48.881639	2024-12-12 07:13:48.881639	\N	\N	\N	58876d14-2a0a-42de-9edc-33998737304e	120000	6b8e6861-e687-4491-97d2-f7bb9ac6bc23	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 07:15:53.445146	2024-12-12 07:15:53.445146	\N	\N	\N	18f54fb2-6290-48ea-802c-1e5c1609d508	120000	44d4bd7a-c7b1-41f9-923e-fc4864114983	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 07:24:14.484831	2024-12-12 07:24:14.484831	\N	\N	\N	1c115965-1379-4b40-a35a-b45267d36824	120000	f1bdc0e7-de5f-4a18-9ff9-7a9113d1f6fb	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 07:31:34.791769	2024-12-12 07:31:34.791769	\N	\N	\N	6136c963-1d63-4f89-b4d3-df17e7f8c9e6	120000	a3205a23-c882-4e0b-b36e-b3b46db67a99	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 07:32:41.932256	2024-12-12 07:32:41.932256	\N	\N	\N	d2c384cd-47b8-42a5-b552-59d6c3ff63e7	120000	a5257984-64b1-42d6-8d8b-5105b2288507	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 07:33:18.596236	2024-12-12 07:33:18.596236	\N	\N	\N	2717397b-40c3-498e-a06a-5944aeef42c3	120000	fc503211-db57-4e9b-8c08-fb3033c9e21f	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 07:36:13.385561	2024-12-12 07:36:13.385561	\N	\N	\N	28082dd6-03c8-4cb7-a520-dae0e861e941	120000	0abcdd48-18fe-4c0d-a6b5-2ab5df7a3715	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 07:38:00.743513	2024-12-12 07:38:00.743513	\N	\N	\N	2c0e25ea-072e-4dbd-901e-7cb974ebf445	120000	03c69bab-070f-4749-8f28-38f4112c777d	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 07:48:49.72939	2024-12-12 07:48:49.72939	\N	\N	\N	49e62c50-b146-4d4b-a328-fc3d0fb059fa	120000	f4852f9e-688d-4776-9860-14d8ad8b72aa	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 07:49:36.686291	2024-12-12 07:49:36.686291	\N	\N	\N	5ec69631-ace6-419f-8692-a1faa99bfb2c	120000	639a4055-4f3f-4156-a8c0-5b9f0d192584	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 07:53:56.933789	2024-12-12 07:53:56.933789	\N	\N	\N	ec80b636-5b73-4880-9684-5c276dc5ba7d	120000	f3566ccf-79d6-44e2-a481-4f38667a6f27	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 07:55:09.684921	2024-12-12 07:55:09.684921	\N	\N	\N	cd07d04e-92f8-4211-8010-efc0c0b978b4	120000	fdbe04d6-764d-4032-ba08-ba30e608955f	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 07:56:06.593827	2024-12-12 07:56:06.593827	\N	\N	\N	02b8d561-e422-46fc-887e-4501a6286289	120000	4623f811-b32b-4360-b0d0-2d34a3873dbb	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 07:56:58.78323	2024-12-12 07:56:58.78323	\N	\N	\N	19787db2-2202-421c-a494-91b72caa4ad6	120000	8286d728-67d5-4a72-b1a6-af6a71673214	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 07:58:25.638796	2024-12-12 07:58:25.638796	\N	\N	\N	a4f317ee-c872-4c1a-a114-3cbd991301de	120000	cb90fdc5-2247-40fc-96d3-0bdb6c47df5d	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 07:59:52.139355	2024-12-12 08:00:35.718406	\N	\N	\N	889b6aa7-da41-42f4-b491-4eeea0bd1f15	120000	812586a4-0300-43ce-ac27-ff4adff9dc25	PAID	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 08:01:33.786572	2024-12-12 08:02:23.696769	\N	\N	\N	23a892ff-1a93-4ffe-8fd3-8ce7ebae5bda	120000	07f2cb6d-c27e-4bca-9f51-e12f6ef61dd3	PAID	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 08:05:23.622518	2024-12-12 08:05:23.622518	\N	\N	\N	b701d280-2621-4555-bbfa-975ecc4ca077	120000	efc53dc9-0fbb-48aa-987b-2c1890d6aa4b	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 08:06:13.490656	2024-12-12 08:06:51.9241	\N	\N	\N	250cf3f0-a0ed-488f-ab21-c526d841d23a	120000	c6cdbc19-0837-453b-9875-435914f4fd33	PAID	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 08:18:33.068022	2024-12-12 08:19:14.714144	\N	\N	\N	b73ebebb-45d8-4613-b48b-90b3b56b12b6	120000	ae0cf9ec-c14b-46d5-8795-aaf3f87b8973	PAID	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 08:21:49.586221	2024-12-12 08:21:49.586221	\N	\N	\N	cda30bc5-cac4-4eca-b400-0c9902a8987c	120000	29d3afe8-fb64-47c9-9fc1-be92c283da5e	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 08:22:35.714746	2024-12-12 08:22:35.714746	\N	\N	\N	3d9c2ea3-0747-4313-84b2-16ba943d17ca	120000	e24b54a8-d7f8-4859-8564-c8869b861296	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 08:24:00.229358	2024-12-12 08:24:00.229358	\N	\N	\N	eaf7ee94-5cb7-4807-9742-1773ccccb3aa	120000	e45f0a7b-01af-41a7-bd43-7daaef44ea9b	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 08:26:54.90974	2024-12-12 08:26:54.90974	\N	\N	\N	bf2f840a-0d0a-4474-aa19-9c2093ca35fd	120000	3ca20345-ff39-4768-8c1c-d5e99d44d2cd	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 08:28:26.80303	2024-12-12 08:28:26.80303	\N	\N	\N	8f0cbb05-e69b-4b7b-a7c6-13a5ea4218dd	120000	5ea02eb0-aa63-4633-bc85-5c70a59decde	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 08:29:06.719295	2024-12-12 08:29:06.719295	\N	\N	\N	4ce88d03-c4bd-470c-a1df-82c257e87632	120000	591b6102-538a-43e9-becb-63a9bd64841f	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 08:30:20.216207	2024-12-12 08:30:20.216207	\N	\N	\N	7e367fa4-b432-4ea4-8f32-ec70557bdbf5	120000	d4d06359-d12c-4502-9297-b296878e62a0	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 08:31:03.57012	2024-12-12 08:31:03.57012	\N	\N	\N	d7f6b9fd-90ee-4356-99c6-d57a3aaeb3d8	120000	3dbb358d-8c8b-46d4-a789-d546a177b751	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 08:31:55.731878	2024-12-12 08:31:55.731878	\N	\N	\N	ab6dd659-68a6-4017-a8b7-8f2ab2262440	120000	056c2cfc-a135-4270-bfdd-9105b7e3daff	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 08:33:30.551116	2024-12-12 08:33:30.551116	\N	\N	\N	f255f5c2-8515-419b-8c5c-f806d3befc7b	120000	ce0597ef-3a49-4141-bc5f-a81ec4fceca2	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 08:35:40.897327	2024-12-12 08:35:40.897327	\N	\N	\N	40c9430e-0065-4a42-9bf4-5cf3bde10629	120000	2d23f22f-99a6-4ab5-94c0-0a6713725a09	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 08:35:46.294913	2024-12-12 08:35:46.294913	\N	\N	\N	8ba82ae1-5594-4c89-a4f2-7d9b6642d7f6	120000	64524d84-6d7a-4841-96c9-05adcca0c92e	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 08:36:47.727168	2024-12-12 08:36:47.727168	\N	\N	\N	338f4980-000b-4c38-8533-abd111cf8390	120000	9542d8f7-34e5-4a62-b26e-b33cca5b53a3	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 08:37:35.996165	2024-12-12 08:37:35.996165	\N	\N	\N	3edbf46a-9056-46ef-aa0b-35d68e8073ba	120000	05ed17fc-1664-4b0e-877c-e3b3a13f62d5	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 08:38:03.944425	2024-12-12 08:38:03.944425	\N	\N	\N	8ce2a090-2c69-43ff-961e-7ade5ab3d0d8	120000	f7ae23b7-cdb4-4075-9f12-aec452fd234a	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 08:39:08.509729	2024-12-12 08:39:08.509729	\N	\N	\N	12712147-9e5c-490b-9f4f-5759e555cbe8	120000	b59d6538-2612-40d8-a178-36560e59ffeb	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 08:39:29.345212	2024-12-12 08:39:29.345212	\N	\N	\N	132dabf3-8c1c-4a3a-88c6-39dba8f7f9c4	120000	519d6a9a-36b0-4d06-aa4f-093fc5fef8e2	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 08:40:59.006393	2024-12-12 08:40:59.006393	\N	\N	\N	0a79be8b-0c46-4cfc-ba38-3ad93f7d07d8	120000	7054d748-8fd7-4f19-816b-3953903b7459	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 08:43:41.153766	2024-12-12 08:44:08.439426	\N	\N	\N	e3f423b6-878d-4a3d-81ce-c6a519d54697	120000	444aa2c1-1be8-4c48-a630-9b48159d1e67	PAID	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 09:07:30.958157	2024-12-12 09:07:30.958157	\N	\N	\N	5d076ad8-068d-4c83-a66f-362e6ae67724	120000	4ab9c4de-afaf-4f49-9246-71d6e5d11fad	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 09:09:07.72288	2024-12-12 09:09:07.72288	\N	\N	\N	a8114d51-f856-487e-a7de-280239eca496	120000	ffb9865c-5ad9-432c-8154-44a9b3752361	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 09:09:22.221608	2024-12-12 09:09:22.221608	\N	\N	\N	73154662-9703-4b9e-b600-9adbe23d905a	120000	58727387-2839-42fc-976f-53fba9d3033e	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 09:10:03.841845	2024-12-12 09:10:03.841845	\N	\N	\N	00c4b25d-f3e5-4828-9aa6-d33d65436bd1	120000	459fa60a-4f6b-4989-b1a4-ebaa001bf883	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 09:11:38.025476	2024-12-12 09:11:38.025476	\N	\N	\N	27a3ac3a-b85d-4d36-967b-9e666cc9991b	120000	b1df97e4-7583-41fe-94fe-0b9cd3dfbf51	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 09:19:03.452492	2024-12-12 09:19:03.452492	\N	\N	\N	99030627-37ea-4f3e-b3c0-2e27cb73dd97	120000	4d247660-9025-4711-8393-f99cec52593e	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 09:21:29.879862	2024-12-12 09:21:29.879862	\N	\N	\N	151e2913-6135-4051-9af0-6b8e7b372ff7	120000	5e223eb6-a5eb-41e3-b41d-e49c974d94c9	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 09:32:32.45809	2024-12-12 09:33:21.076658	\N	\N	\N	7bfd6290-8c5c-4ffa-bd79-d377e21341de	120000	04374b19-c018-4fbc-a5a8-b105103ebf3e	PAID	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 10:09:54.138228	2024-12-12 10:09:54.138228	\N	\N	\N	64fcdd03-799f-44f8-ae27-37cc7245ed43	120000	32e854c9-c6dd-418b-bbfd-a9da57e80975	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 10:11:46.087895	2024-12-12 10:11:46.087895	\N	\N	\N	0f97c71c-21b9-4c4e-85ca-628ffeaf43e5	120000	350243d3-3dfb-4089-80f8-24431df53c4c	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 10:18:53.672576	2024-12-12 10:18:53.672576	\N	\N	\N	823b3273-37d8-47f2-a5f0-ec412fa5c79f	120000	3221730b-be7c-4047-91ab-a360c4d353f6	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 10:19:29.796262	2024-12-12 10:19:29.796262	\N	\N	\N	84579b6d-700f-4cc9-9885-76a418f897a1	120000	b412b994-2921-4c9c-a264-7a868ddf942d	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-12 10:32:52.214598	2024-12-12 10:32:52.214598	\N	\N	\N	368d86e7-757a-47bb-8e42-35b0d2f463c2	120000	69bef52f-9fd1-4537-878b-3dc2a09aab3f	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-13 01:27:42.124185	2024-12-13 01:27:42.124185	\N	\N	\N	d7a93394-50eb-4595-abcd-201b186f5c76	120000	fe34882a-68cc-4417-882b-0031ff2a8b3b	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-13 01:28:12.885882	2024-12-13 01:28:33.178057	\N	\N	\N	dca3fce8-baf0-46df-b313-12479507d844	120000	f9c8e2b3-35bb-469e-a3ea-da570f11545c	PAID	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-14 12:19:45.563846	2024-12-14 12:20:21.40725	\N	\N	\N	4b8e0df0-0400-48b2-b02c-cab197830025	120000	9a346bad-de31-4d9c-ae0c-64dbc48999e4	PAID	740034a9-1e8a-4b0d-a8e8-549914b6dd21	\N	\N	\N
2024-12-14 13:04:50.569875	2024-12-14 13:05:17.195501	\N	\N	\N	e54427da-9975-4077-8fd9-ef7647c29562	120000	35fbdf79-ec2e-4dde-924f-b9c2df7f3421	PAID	740034a9-1e8a-4b0d-a8e8-549914b6dd21	\N	\N	\N
2024-12-14 13:05:25.578445	2024-12-14 13:05:45.88905	\N	\N	\N	1c4e5490-7d6d-46f1-9e0e-54619e240ca3	120000	8efaa4f4-b902-45b6-b703-a610b34e2518	PAID	740034a9-1e8a-4b0d-a8e8-549914b6dd21	\N	\N	\N
2024-12-14 13:46:56.530486	2024-12-14 13:47:29.185049	\N	\N	\N	c0ee3853-345c-4bef-9de0-ff6120126b89	1200000	9161fc62-b7c7-4f9e-b1ca-af0d11a90f3b	PAID	740034a9-1e8a-4b0d-a8e8-549914b6dd21	\N	\N	\N
2024-12-14 17:22:04.953574	2024-12-14 17:22:04.953574	\N	\N	\N	3ce8bf21-a73e-4dbc-97ee-fadee8ba75c0	0	10fed799-779f-4c22-a598-332000dfae09	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 08:14:43.945385	2024-12-16 08:14:43.945385	\N	\N	\N	d5314198-870f-4664-85cd-1bf7b8208e63	120000	cb85bbb2-efb7-4781-8efc-89bcfeab2095	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 08:14:47.71838	2024-12-16 08:14:47.71838	\N	\N	\N	dc302168-a19c-4ff6-9c02-a06eb371b2c0	120000	a76d9a91-1143-49bb-a506-068c83accb35	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 08:14:54.479504	2024-12-16 08:14:54.479504	\N	\N	\N	4b011441-08df-4e8f-b613-9b0bd5cb8faf	120000	72b8bd81-6e8e-4aa2-848b-ebafa349c6fa	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 08:15:06.588914	2024-12-16 08:15:06.588914	\N	\N	\N	28ab0bdc-1e25-43fd-98a9-f340364473fe	120000	5900e95e-51b5-4e7e-9173-caf2cef714fa	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 08:16:41.881423	2024-12-16 08:16:41.881423	\N	\N	\N	559f3b0c-f43e-4009-b312-73d2b6324139	120000	b0366d38-53c0-465e-9321-51e68e89b328	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 08:17:12.057791	2024-12-16 08:17:12.057791	\N	\N	\N	517377e3-304d-4479-a341-fb0831a5504b	120000	8ef1982f-94e9-40eb-951d-ca168e50bfa4	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 08:18:09.393082	2024-12-16 08:18:09.393082	\N	\N	\N	fc3e68a5-f731-4c44-8438-ce7c2738d319	120000	19e0bbae-cf96-4c82-8f63-5f3a27294ac3	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 08:18:24.71275	2024-12-16 08:18:24.71275	\N	\N	\N	131cf421-dba1-483f-8a36-d0a425bfe0eb	0	cb03eeb8-9af6-42e5-844a-2ef52ebab119	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 08:18:34.987573	2024-12-16 08:18:34.987573	\N	\N	\N	11f250a2-4905-4a91-bdb1-afcfd1d4dcdd	120000	78e8c39b-c7f0-413b-8572-7a8531fb326b	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 08:20:00.045612	2024-12-16 08:20:00.045612	\N	\N	\N	e78436cb-25e7-458e-8305-d3c195ea251a	120000	218ebcf1-28dc-4bc6-9838-d23f3f0691e2	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 08:21:24.928399	2024-12-16 08:21:24.928399	\N	\N	\N	18b2bc45-76e8-4072-a38a-eb874776f407	120000	57869699-0563-49af-abdd-cc956011c9f6	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 08:22:48.746554	2024-12-16 08:22:48.746554	\N	\N	\N	5d6bf7e2-9c6d-4ae1-a2a1-6ca4d39bb1ea	120000	82abe199-d62f-4a79-964d-4f7cd0ed2e77	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 08:22:52.188526	2024-12-16 08:22:52.188526	\N	\N	\N	99e5d08d-73c7-4394-ad41-7e687016eada	120000	90709c99-dd8c-4635-a0ae-2c677fd1eb9d	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 08:23:44.40404	2024-12-16 08:23:44.40404	\N	\N	\N	881dc5de-1fc7-4b6e-973f-a47eec3717e3	120000	7a4078d2-6d8e-4a2d-9ca3-9fb27eee0e7e	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 08:24:22.783773	2024-12-16 08:24:22.783773	\N	\N	\N	3eb782a6-0464-4b32-8b61-b3977f82aa87	120000	ad3b327a-5b42-4fc1-8583-4a46faf7ad3a	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 08:31:42.3628	2024-12-16 08:31:42.3628	\N	\N	\N	58ae9a53-b347-4ef0-96f0-9048a6709b9c	120000	b2795840-12f8-46f6-bc90-61bac35ddc0c	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 08:42:12.492103	2024-12-16 08:42:12.492103	\N	\N	\N	fafd79be-b41b-4e17-ac3f-469c676a36f6	120000	df457962-1338-4cb5-a4db-d1ae9d679d4b	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 08:45:18.639455	2024-12-16 08:45:18.639455	\N	\N	\N	8b612a2c-095a-488b-acb2-2cfadb3e6886	120000	da609133-4850-4884-b5d7-715039782b22	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 08:48:09.684041	2024-12-16 08:48:09.684041	\N	\N	\N	848d5cc4-a309-45ae-953d-9c4a3fbea256	120000	84439036-b071-4625-b309-efe6ac067b65	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 08:48:12.681495	2024-12-16 08:48:12.681495	\N	\N	\N	3e974902-ea92-4331-ad33-80802201e2c9	120000	a62c45c3-896d-47f3-9579-41e87c56e41b	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 09:06:24.445649	2024-12-16 09:06:24.445649	\N	\N	\N	ca289729-775a-4a5f-b77f-9fe413b299a5	120000	cc4c4b2c-2b2c-4d46-9c82-a34eab67eb01	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 09:09:50.971277	2024-12-16 09:09:50.971277	\N	\N	\N	a37bca01-56a2-40cb-b272-3801624eddc9	120000	db3f5997-8415-4c8c-9c52-8cad101dd6df	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 09:11:51.941081	2024-12-16 09:11:51.941081	\N	\N	\N	a84019c3-9c64-49d7-88cd-747b8a57b223	120000	1a34cdda-1d53-4fed-a3f9-2e66d0304d1f	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 09:12:05.881624	2024-12-16 09:12:05.881624	\N	\N	\N	8d7de2d7-bb7a-4381-bd89-33e79f9a409d	120000	9a27a9fc-80db-4832-89c6-45a546eb28c3	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 09:12:24.580222	2024-12-16 09:12:24.580222	\N	\N	\N	81833e28-e436-4225-b4ba-daf82d615d96	120000	9cdbe503-2e3f-427f-94ec-b474f51052b2	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 09:16:34.186197	2024-12-16 09:16:34.186197	\N	\N	\N	14aabb63-dfaa-4497-b140-a9c21954a01f	0	4e3a4f78-be80-45d9-b005-4c5cf37cb504	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 09:20:29.964132	2024-12-16 09:21:55.070383	\N	\N	\N	fb47c1ce-9f81-4f63-a04e-7deebc9038bd	100000	d0d072fd-5e6f-4ae7-b300-02dd3635471d	PAID	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 09:23:14.657363	2024-12-16 09:23:55.816722	\N	\N	\N	eb151481-075b-40b3-a23c-ec53eff6a37f	100000	1ab09603-8806-4fe5-b9a1-9aa5e32f0018	PAID	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 09:58:41.108404	2024-12-16 09:58:41.108404	\N	\N	\N	987e8715-2a41-4b9f-a8c5-afee411d8c0a	120000	e252a27b-bcb2-47aa-81e9-2820bd7cb08f	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 10:51:30.874329	2024-12-16 10:51:30.874329	\N	\N	\N	5fd772d5-a4b8-4b6b-9c77-65c012fa725b	120000	c6deb1d6-8ae1-494a-a375-2f0d0c33572d	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 10:53:26.525941	2024-12-16 10:54:13.08707	\N	\N	\N	63ed9a6f-1895-48f0-92b8-7ad6314c5a6b	120000	3aa5cc17-4894-41ad-9928-51cf85bce575	PAID	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 10:56:29.017427	2024-12-16 10:57:02.216716	\N	\N	\N	6bfdefd3-49a7-45e0-a375-08fa1fe4753d	120000	96c12ecd-e3bc-4582-ba38-d191ddbada06	PAID	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 11:33:06.973403	2024-12-16 11:33:35.514412	\N	\N	\N	fd337f84-5a2c-40bd-9862-0f95ea71a69c	120000	2c1c8466-5e3e-4828-89d3-a7fdaefc7c9b	PAID	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 11:34:27.862074	2024-12-16 11:34:27.862074	\N	\N	\N	7c4ef966-a91b-42ab-aee0-3b51f5b1baf4	120000	2aea12b3-7650-46d3-ad67-caf02137a05e	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 11:37:23.786736	2024-12-16 11:37:23.786736	\N	\N	\N	62d7a0ed-eb6b-41c1-a265-605d17d987e2	120000	1eec9f71-4bf3-4692-afb2-42df98777e61	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 11:44:20.762881	2024-12-16 11:44:20.762881	\N	\N	\N	e5a32791-4354-4ff6-911e-d47f44abf702	120000	cb0f9944-adf8-444f-9ef3-acf0c4a7ca92	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 11:45:24.531264	2024-12-16 11:45:24.531264	\N	\N	\N	f967d453-a644-4f5c-baea-917fb8be0fd7	120000	68990464-7a84-43c5-af72-ee0a97d8d48d	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 11:46:02.517439	2024-12-16 11:46:02.517439	\N	\N	\N	8222128f-02df-4fd3-820d-ffe6d03d2900	120000	2a4fb836-c2a6-4d2b-9dd3-8b9b6522b525	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 14:08:09.359079	2024-12-16 14:08:09.359079	\N	\N	\N	2e9a7c02-cfc3-4a7b-b21d-9219066c96db	100000	dbcfa293-f49c-42e8-8c0c-d2aea4a7acde	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 14:50:29.090032	2024-12-16 14:52:04.346307	\N	\N	\N	ada37d79-6d7e-4359-8a97-0cc9640d2955	100000	e2bcfdcd-caa6-45a3-9ae7-71b73025524f	PAID	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 14:58:08.420405	2024-12-16 14:58:08.420405	\N	\N	\N	898b597b-5ac3-4e02-b73a-754ca882d3de	120000	0e983658-5982-490a-81e8-79d18ef1a7e7	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-16 16:57:02.023212	2024-12-16 16:57:02.023212	\N	\N	\N	6a15b8fb-8909-4f50-96d7-b85c009d2e39	100000	1b689b17-85fe-46d3-91a7-ba456d292c9a	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-17 08:05:04.190897	2024-12-17 08:05:04.190897	\N	\N	\N	30337e07-868f-46ec-90d1-7fa3e7da6669	100000	68aa3212-4154-405e-8f25-7ec5bb8c0861	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-17 09:50:07.840418	2024-12-17 09:50:07.840418	\N	\N	\N	017baee4-df4f-4143-99d3-62e29970862e	120000	f667cced-dd16-4443-9e6e-ecb41aff8266	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-17 10:05:08.934236	2024-12-17 10:05:08.934236	\N	\N	\N	60173099-4a7f-4a28-ae20-305f199ab2c3	100000	877af470-a1ae-4a91-b8c9-5c3a6c5dfc9f	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-17 10:38:38.30017	2024-12-17 10:38:38.30017	\N	\N	\N	86587b23-3f44-4948-b75d-eb07a4399ee5	220000	f45dd244-9004-4e0f-a642-b1918e081bb6	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-17 10:45:38.793455	2024-12-17 10:46:08.014303	\N	\N	\N	8df01930-3a42-42b1-b923-5559cd3bed50	220000	704dbef4-8fb2-4ea1-a19b-d71fd7242682	PAID	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	\N	\N	\N
2024-12-17 10:46:49.816715	2024-12-17 10:46:49.816715	\N	\N	\N	f530d3e1-aac3-444b-980b-9cce39720797	220000	4875f0b1-9f3d-4f30-b945-284b42900662	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	Hà Phú Thịnh	haphuthinh332004@gmail.com	+84933516434
2024-12-17 11:05:13.995184	2024-12-17 11:05:27.994461	\N	\N	\N	758a77c2-9957-45e1-9ce5-b5371a6ed84c	220000	ff73aab0-07b2-485c-b08a-1744c71e5e5c	PAID	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	Thịnh Văn Hà 1	chabu332004@gmail.com	0123546897
2024-12-17 11:06:29.94179	2024-12-17 11:06:41.691575	\N	\N	\N	d06f21bc-102a-457f-ace3-529ad7dd8385	120000	b19cef11-f094-4fcd-8eee-8139c19b20f1	PAID	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	Thịnh Văn Hà 1	chabu332004@gmail.com	01234567988
2024-12-17 11:07:50.725638	2024-12-17 11:07:50.725638	\N	\N	\N	8ab94c14-ec20-41f9-bb92-1245efd135cf	120000	e0f163da-c69d-4135-9f18-ab1c64e86eac	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	Thịnh Văn Hà 1	chabu332004@gmail.com	0123456789
2024-12-17 12:06:30.640858	2024-12-17 12:06:30.640858	\N	\N	\N	11a173c1-971a-453e-b9c7-e0d6c4ec5f9f	100000	72cd90db-f133-4ea1-b835-01c140ac6b97	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	1	2	34
2024-12-17 12:06:45.618455	2024-12-17 12:06:45.618455	\N	\N	\N	62981fe7-a3d8-41c0-8be0-3e437b497f38	100000	a05ca65d-8172-46bb-9848-936293657f0e	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	1	2	34
2024-12-17 12:06:59.91677	2024-12-17 12:06:59.91677	\N	\N	\N	27861eb3-d6d8-4d15-aa4e-6a357ea6a082	100000	a7fea5b3-a7d4-43a9-8854-f51668c39a8a	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	1	2	34
2024-12-17 12:08:46.095142	2024-12-17 12:08:46.095142	\N	\N	\N	c9ca93d8-e755-4021-b89c-091e91f5d3ee	100000	5fe4fac4-888c-4eca-907a-2a63f1fce7fb	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	1	2	34
2024-12-17 12:10:36.433161	2024-12-17 12:10:36.433161	\N	\N	\N	fef322ff-8236-4587-8af0-3ef2bbef3c14	100000	8b00818d-4fa9-421c-bb15-3f61db1cc5c1	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	1	1	1
2024-12-17 12:11:19.488028	2024-12-17 12:11:19.488028	\N	\N	\N	77b5608d-988c-446c-9a27-1e150cf5b714	100000	ae3f52e2-812b-4cc4-89cb-75387b554d67	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	1	1	1
2024-12-17 12:11:37.409449	2024-12-17 12:11:37.409449	\N	\N	\N	fd63546a-7655-4528-9f8f-4c3615379638	100000	180b1066-4fe3-4c2d-b4ac-e6d539b4a02c	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	1	1	1
2024-12-17 12:12:03.765767	2024-12-17 12:12:03.765767	\N	\N	\N	b7d637f1-8f1a-4743-8360-113d58a82ac5	100000	0012dd4d-e92f-46c5-b4a4-8f30b04d0612	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	1	1	1
2024-12-17 13:00:49.219768	2024-12-17 13:00:49.219768	\N	\N	\N	1ba506c5-2c04-44c7-bb0f-d3a27586793d	120000	e97099ee-cf69-4bee-ae07-8ab22af33f51	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	1	1	1
2024-12-17 13:05:43.99993	2024-12-17 13:05:43.99993	\N	\N	\N	fdfaac82-64de-4e9a-bb60-4b87b336ada1	100000	3959d0dd-912d-4017-b470-fcc7dfddc5f9	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	1	1	1
2024-12-17 13:06:39.189474	2024-12-17 13:06:39.189474	\N	\N	\N	4128eeaf-6a3b-4fc6-8cfe-c32dc876f7f5	120000	912cf0fd-4526-41ca-a1a4-04078106b875	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	1	1	1
2024-12-17 13:07:55.147317	2024-12-17 13:07:55.147317	\N	\N	\N	1aa4df3c-19ac-43b5-89cb-314d49004bfa	120000	00f51263-e4ca-42e9-b8c6-54d9d696579d	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	1	1	1
2024-12-17 13:09:36.784526	2024-12-17 13:09:36.784526	\N	\N	\N	931385f7-358b-488e-9994-580c8febc6fe	0	77bc151a-49ae-499a-a11d-157f641f2072	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	Hà Phú Thịnh	haphuthinh332004@gmail.com	+84933516434
2024-12-17 13:09:41.967961	2024-12-17 13:09:41.967961	\N	\N	\N	1939e94a-c549-4933-8329-58138e899db7	120000	fcbd2240-d30c-41d7-ae70-26f83b496ff3	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	1	1	1
2024-12-17 13:10:11.258226	2024-12-17 13:10:11.258226	\N	\N	\N	86a819d8-850e-453d-bc95-9bc3b0d27f1f	120000	8f1341b2-b490-4d17-9643-1d054cde893e	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	1	1	1
2024-12-17 13:10:47.033195	2024-12-17 13:10:47.033195	\N	\N	\N	02255a47-995d-41f7-a10f-190cf58dd3df	120000	458c4696-f4e0-4931-adc5-653c06f7eb3b	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	1	1	1
2024-12-17 13:11:42.017323	2024-12-17 13:11:42.017323	\N	\N	\N	3fb2b3dc-7651-4777-8447-a86cdbe6f89d	0	28489e7d-0640-40a9-b6ba-e0012352f3e0	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	Hà Phú Thịnh	haphuthinh332004@gmail.com	+84933516434
2024-12-17 13:14:35.269771	2024-12-17 13:14:35.269771	\N	\N	\N	3029226d-eb26-4c79-a5ca-641ba2ea591d	120000	b2ab56d2-8575-4ba4-9fe5-53b3e72a8598	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	1	1	1
2024-12-17 13:18:04.706387	2024-12-17 13:18:04.706387	\N	\N	\N	c618c7d0-38a5-4e53-9c43-db06a65dfc14	0	6fe0a33b-dd91-41aa-a748-8864546322d3	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	Hà Phú Thịnh	haphuthinh332004@gmail.com	+84933516434
2024-12-17 13:18:06.191519	2024-12-17 13:18:06.191519	\N	\N	\N	3d75d228-2883-45f1-a6ee-890146ebe335	0	3bba67c4-11bf-420d-bf00-1fdeeb7cf697	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	Hà Phú Thịnh	haphuthinh332004@gmail.com	+84933516434
2024-12-17 13:18:07.395053	2024-12-17 13:18:07.395053	\N	\N	\N	aeb6c63d-2f19-443d-80c9-376a229c0867	0	2333c7a2-c717-4f92-b5e8-3de0f3653c92	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	Hà Phú Thịnh	haphuthinh332004@gmail.com	+84933516434
2024-12-17 13:18:08.493409	2024-12-17 13:18:08.493409	\N	\N	\N	b1a2e47e-0ee3-4997-acde-df3f2a89e2da	0	4f28fe94-e8aa-45f6-ad8f-50fbaa021d3c	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	Hà Phú Thịnh	haphuthinh332004@gmail.com	+84933516434
2024-12-17 13:18:09.468914	2024-12-17 13:18:09.468914	\N	\N	\N	7cb3d12c-3c68-406a-9d6c-fb49592f286d	0	0af85ad3-4177-4cd3-bfec-93557cef77ea	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	Hà Phú Thịnh	haphuthinh332004@gmail.com	+84933516434
2024-12-17 13:19:01.623941	2024-12-17 13:19:01.623941	\N	\N	\N	95e0cd93-bd55-4aee-8fb1-b6cc92b57461	100000	89a6d501-7a7c-4299-8a64-3cea06c1951c	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	1	11	1
2024-12-17 13:19:53.371299	2024-12-17 13:19:53.371299	\N	\N	\N	7a6043d9-ee78-48d9-9521-c60849b09cf3	100000	89334185-38bb-4a83-a896-bb85a6ee8eba	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	1	11	1
2024-12-17 13:21:27.927238	2024-12-17 13:21:27.927238	\N	\N	\N	174ba5bc-2eec-4910-a901-6cd12771b996	120000	bc12ff24-fac6-4ede-86a8-d8742a57a7f9	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	Hà Phú Thịnh	haphuthinh332004@gmail.com	+84933516434
2024-12-17 13:21:33.527648	2024-12-17 13:21:33.527648	\N	\N	\N	9ebda485-9ea0-4c1d-a8f0-83acae2cb8b2	120000	5e8106db-a152-4ed4-8ec4-512c769c5035	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	Hà Phú Thịnh	haphuthinh332004@gmail.com	+84933516434
2024-12-17 13:21:34.743889	2024-12-17 13:21:34.743889	\N	\N	\N	03499bc1-90bb-4f16-9bb2-a8be0c999f20	120000	94fbc6f6-59e2-4cb9-bdee-33bfa7050092	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	Hà Phú Thịnh	haphuthinh332004@gmail.com	+84933516434
2024-12-17 13:21:35.67615	2024-12-17 13:21:35.67615	\N	\N	\N	428dd956-5451-491c-a5f2-62428809a470	120000	15017667-37b3-4b1f-af1f-716344d5fe67	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	Hà Phú Thịnh	haphuthinh332004@gmail.com	+84933516434
2024-12-17 13:21:36.637039	2024-12-17 13:21:36.637039	\N	\N	\N	a494c501-b1cb-4293-b8e5-4a2bf57a1ca1	120000	41458385-dbd6-4880-908f-03df59cea11a	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	Hà Phú Thịnh	haphuthinh332004@gmail.com	+84933516434
2024-12-17 13:22:08.180143	2024-12-17 13:22:08.180143	\N	\N	\N	e878ed06-36b5-4bf7-af5b-c24de4ab1490	120000	2f208888-8427-4113-8da7-703312e9e3cd	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	Hà Phú Thịnh	haphuthinh332004@gmail.com	+84933516434
2024-12-17 13:22:38.921394	2024-12-17 13:22:38.921394	\N	\N	\N	67160c19-5aba-425d-a267-86552c06bc1c	120000	2f0e7fbb-0216-474c-b091-f86906e5c49d	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	Hà Phú Thịnh	haphuthinh332004@gmail.com	+84933516434
2024-12-17 13:24:26.880988	2024-12-17 13:25:52.546255	\N	\N	\N	5dd2336e-5ecd-468a-86c7-a9c71370725c	100000	5a083cef-c342-48c7-832c-3c9f3bb8a3cc	PAID	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	Thinh Ha	chabu332004@gmail.com	0123456789
2024-12-17 13:26:56.430494	2024-12-17 13:26:56.430494	\N	\N	\N	41406213-d06d-4ccb-aa99-3f907d7d2c13	0	df0b0957-927d-4196-b25c-d79eb8f2581a	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	Hà Phú Thịnh	haphuthinh332004@gmail.com	+84933516434
2024-12-17 13:28:40.344026	2024-12-17 13:28:40.344026	\N	\N	\N	b4c33bc7-a687-41ce-8302-405b6192c9e4	0	da62f54a-f1f3-45a9-a79d-d603be065250	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	Ha Phu Thinh	chabu332004@gmail.com	0123456789
2024-12-17 13:28:50.162101	2024-12-17 13:28:50.162101	\N	\N	\N	d13718fc-edb2-4640-92d7-058c62b300ee	0	0c002256-363b-4f2d-a585-f48123598ab5	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	Ha Phu Thinh	chabu332004@gmail.com	0123456789
2024-12-17 13:28:57.705949	2024-12-17 13:28:57.705949	\N	\N	\N	a44d2561-17e5-4ab7-a713-f35dd798cdda	0	7a66caa8-e25d-4866-a075-65c4d110d2d9	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	Hà Phú Thịnh	haphuthinh332004@gmail.com	+84933516434
2024-12-17 13:29:09.279816	2024-12-17 13:29:09.279816	\N	\N	\N	b68b3c7b-d176-4079-81a3-f195c79b52b6	0	9b4c207f-b368-4931-ac23-6290934e1855	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	Ha Phu Thinh	chabu332004@gmail.com	0123456789
2024-12-17 13:30:35.970759	2024-12-17 13:30:35.970759	\N	\N	\N	81ea7dc1-2e14-4e9f-85c1-20481aea31cc	0	3cb0a11b-f3c1-4f9f-b0f8-2d17e7fcbf9d	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	1	1	1
2024-12-17 13:32:36.07448	2024-12-17 13:33:18.452972	\N	\N	\N	e52f5993-f027-40ed-950d-0590e296ae32	100000	aa325a09-58e4-4187-9063-078a06ac7b75	PAID	e8e2b77b-170e-4d64-bcbc-bdd16ec8687b	Duy Hieu	duyhieu452004@gmam	0123456789
2024-12-17 13:34:29.7004	2024-12-17 13:35:18.141832	\N	\N	\N	f9b6dbc2-a7e4-4dd8-a440-48373571fef6	120000	2166fc64-a4d0-4862-9ef6-3cce049d60d8	PAID	e8e2b77b-170e-4d64-bcbc-bdd16ec8687b	Hieu Nguyen	nhdhieuu123@gmail.com	0907473581
2024-12-18 16:52:45.591626	2024-12-18 16:52:45.591626	\N	\N	\N	3960c74d-0fcf-4229-9613-b21427236a09	0	b3ca1a0e-a5e1-4d44-aa9d-8738b407e2c7	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	Thịnh Văn Hà 1	chabu332004@gmail.com	0907473581
2024-12-18 17:12:05.433527	2024-12-18 17:12:05.433527	\N	\N	\N	a842b896-e045-4e24-951f-5084383c1a1f	100000	df3c7f2a-1465-4c69-ad4b-fbd50f9cbba7	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	Thịnh Hà	haphuthinh332004@gmail.com	0933516434
2024-12-18 17:12:06.114028	2024-12-18 17:13:26.40061	\N	\N	\N	44d60be0-0b29-45c7-a868-1bbfab33b40e	100000	043cbe8f-8305-416d-89b1-7e843e23fc9b	PAID	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	Thịnh Hà	haphuthinh332004@gmail.com	0933516434
2024-12-18 17:25:59.598933	2024-12-18 17:26:39.693222	\N	\N	\N	2ae512b3-2f9e-45b9-b8bf-3724cc29982c	120000	4e2f37c8-1f0b-4c11-a35e-05c72b463994	PAID	7d302099-c41b-4aae-9a7e-d89cf0ee22f9	Hiếu Nè	22520439@gm.uit.edu.vn	0933516434
\.


--
-- Data for Name: orders_items; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.orders_items (id, price, course_id, order_id, course_key) FROM stdin;
eb356c93-b4c3-4358-9fb5-f12798c8c797	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	00ee470c-5ef1-4a59-bba7-0b9bcfc2df5f	\N
3b15ba22-5823-4114-9f50-88fa44e055dc	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	00d09912-45d9-4c5f-bcfc-8e6522c6eab6	\N
618b60f8-b671-4a81-9ea9-472e0c4dd58d	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	e94b2041-6c17-40a2-adef-3039b962a29c	\N
4e3a3562-f5e0-404c-96e4-b3b0137b3b7b	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	03792e58-92a9-4cc0-be00-2289272bc03d	\N
57565aea-c863-4e05-a218-6556964e9695	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	ab95a706-edca-467e-a45d-423a56d4fc41	\N
bea275ff-8a6e-44b2-8480-788d9d2a71bd	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	8588ab51-61f7-432a-9c0c-ef77ccbf3d84	\N
b1c191dd-b196-4734-82f2-7c02c07f3f37	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	6fc89910-65ee-497a-b7af-a4b8251f62ec	\N
21b38143-c655-4486-a97f-a1a9f3721c21	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	231c475e-83e6-402f-9177-f4946cc194f6	\N
505bc7ef-d99a-4378-a209-bcbf0dea49c0	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	68f1d2b0-13a6-4dd8-976c-0cc8c3ddff03	\N
b115b4cc-1fd7-42f4-9f13-34751159c4dd	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	7f563a52-b204-4270-965e-44081d9d386d	\N
d5d624fb-fbe7-4ccb-9737-92b84d1bac49	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	1a8935ec-10e6-4ce3-90bb-8944ddc60a2e	\N
c2e6008a-f762-4aa3-aebf-688102de8ed6	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	d2cc87fe-2870-4f05-8e30-d51e37add1c1	\N
9bba8060-3e31-4940-955f-91f543bbeef4	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	a60f80c8-7779-48ae-a6d6-9fb349771c12	\N
254c509b-aed7-4b7f-be5b-20843fc70682	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	212e5d75-fdab-4963-8aad-66a87938357e	\N
1aca7220-93c9-4b89-91af-cbbf4978f90b	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	6a641bc6-6723-4517-af15-97c29977e6d4	\N
0dd12213-024c-4abe-9938-8c6f17f73818	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	5cc57aa1-098e-49a7-ad74-6ffa3e6a2755	\N
8b2b24ef-ed7a-4707-ab70-9c5d12e5cd2b	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	755e7c02-552c-4d84-9b94-48da39c62a50	\N
96f3699b-4ca9-4e79-80c5-c894dce340c0	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	5bdca9d2-8938-4cf0-a39d-f083fdac5ea2	\N
bb2c17da-f53e-4027-a12f-c009ed7c1ad0	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	03ab971d-4dc3-4bde-b092-4b78a470eaee	\N
eb63e8be-51ff-41b3-9524-2cd0af886d56	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	3efd82da-8047-48a6-bb9a-3f8665bf0c3d	\N
7f182222-537e-47be-a48a-4d90f90408eb	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	78291440-9793-4eed-980b-2f09b8448363	\N
f22083fa-5fa0-4f83-9f8d-9313f167fe98	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	9dc18bd5-c1f9-4597-96ed-9cb13d9cce41	\N
d0c25134-e7fd-40cc-b1fb-e1d1923c97e6	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	8e44f4f2-22cb-4344-b4b0-37824be3e07a	\N
01e89c11-cabf-4c50-ab7f-a68c71c811d1	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	54a89ebd-38d1-4565-bf4e-1b3788992096	\N
514534ec-8502-437c-8378-2c283b6267c7	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	b573d2d1-d46f-4cf3-9ec8-d77ed8cd537a	\N
ae84a62e-eeee-4539-bf73-db8ba1f80435	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	7b015809-b6e5-4332-b11e-7929167f0cf7	\N
c2b3ac16-a115-4512-aa5a-afdd18dc19ec	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	40d8c2fb-3866-416c-b057-071e45bf1d3a	\N
72d455f6-3638-4610-ada3-e449a809ff9e	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	982a27fb-f82b-49fc-bcc6-65220881dd03	\N
256a234e-0193-4ac9-b08b-6af2f8db16ab	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	779d411b-f177-4c8d-8378-c772d680a2fa	\N
9d038cec-a7b4-4191-a1ef-a047f41991d1	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	c330d830-bd4c-4d2f-b25f-a4a997465283	\N
9a2f5b72-cb72-431e-ad6c-f9c77bf14205	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	a38cac22-e7c5-46ab-9d59-f5fe3ff41bd5	\N
40f81d2b-47f7-4be3-ae6c-6d5bfa413031	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	f3a595af-8130-442b-84de-96ac76bd5d82	\N
6f3ca10f-2617-4481-a535-d961974a0e8b	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	25117fc1-0c19-40a8-8983-d3b9fa32c40d	\N
e0b377b9-9a08-44c7-980f-f6c5afb6838e	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	dabf279d-a8c4-4ec1-bb6c-b81f4531cc34	\N
9aba2830-a2c3-4586-b4e7-f366ccb7ebcb	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	d0876d80-7c09-4612-99ec-db05351457c0	\N
3a704ebf-fbfa-494e-bc5f-f3a02fb2375f	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	f739ac47-88b4-4261-a0da-c57762b84742	\N
7f9d5ab6-3f05-4f73-ae2b-df547c3bb8c1	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	1a2d3a73-b8cf-408d-a1d6-ab0e7f7965ce	\N
59ae287d-1240-43f0-a856-0b558d17cc71	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	4e8d2b5f-a655-4986-a5fb-ca9cbe0efc0a	\N
6756b1ba-e228-42ed-ad80-73a2948588e7	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	cb53aa4b-8f16-40f0-925a-429bf16623b5	\N
aabd5e99-f8c4-4c74-99cf-d510c62f0f58	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	89cc6fa6-9f19-42e1-85c7-abcb99653459	\N
f7d94d35-ddc5-4cf2-afd5-d0db87aba934	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	7f0e1959-ede9-42f4-a4dd-d4f757897415	\N
ecc25183-a46d-4841-bb9d-61c7782a9eb3	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	f1e1da98-e0bc-49ef-a0eb-e67141595c5b	\N
2bc4585b-523a-436c-8119-ab897ca36afd	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	7701877c-0f2d-42aa-a4d8-c3deac495834	\N
e43e423d-f5a8-41b0-a428-8188bf00a122	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	dfc655db-acdb-4f0e-8a2f-46a7506593ab	\N
706a60f1-6e65-48b4-8ff4-52a7a15a0d01	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	0d3be0d0-dbab-4017-8122-8848c8b9ca2b	\N
1ae468ea-4dba-4785-8f7c-42472a8981ab	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	03fdff91-ad33-4d6f-aab3-bcacc1823a14	\N
c27412f1-03b6-4937-9954-b7a8ccd32591	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	7e362601-f9b5-481b-88f8-b8df73a54df4	\N
ee2c13b8-51e6-44a8-9ebf-d769df022968	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	b2a83b53-51c5-4489-bd2a-1cc680ae1528	\N
83493797-a299-4437-bf59-9ac6beb68895	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	5529cd5a-ec89-49ef-b9d1-512ee5155130	\N
6dcb2d19-238c-43ba-9f27-f7498c7717bf	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	29d3e729-a5ad-4238-92fb-2b96fbc90794	\N
4b939437-6a89-437e-8653-dc37ba315f3d	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	978716c0-283a-4cdc-b886-103da7f52cbb	\N
7493ffbf-fd67-460b-a564-e63893e36ee0	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	fc4b940d-07e4-4cfb-8646-961482a9b0eb	\N
1bea5963-1170-481a-aa05-af2d684f3101	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	b53b2c5f-81f7-4400-9aef-f86596a204bd	\N
7606ea48-49fb-4605-b9ad-ef2ed23dbb3a	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	ac774b81-99f5-4b6a-b60f-f5ed1ae40cfe	\N
43851ed3-e408-42b9-a5cf-f157d4262271	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	5f67e08d-0f64-448b-b20e-388e77e8fa9f	\N
d0f506ef-9f54-429a-8eaa-a6d6f593ea80	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	f59246c4-f5a6-4d8c-8649-7c128ecc4bab	\N
726891a4-a2dc-4909-b2ec-7267795ba5e4	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	9fbca765-3ad3-43ad-92c5-4c4bdf898e90	\N
2aadb745-d527-438a-85db-e0ab215b866c	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	32459252-007d-4d3d-bb10-0c67d042b628	\N
9cc1956a-3805-4075-9096-c8cb56adbf7e	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	97bd1326-da1a-42ce-9615-5ad87217b9cb	\N
1f62fa31-3609-4a39-8e7d-5063b136540b	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	bd00fc31-0a32-4c9c-92c3-d30d4c1aa4fb	\N
3faa4b24-9563-4be8-872a-19e52a0ce427	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	dfee518c-73bf-424e-993f-61237653af67	\N
249c1993-af0b-449d-b464-96293ecd7d89	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	5cbd01d3-d89b-4a47-991e-e7313e13b0df	\N
8a6ad116-631a-409d-b8df-cebdffad1780	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	d8977890-8f61-4076-a7b3-cfc939076e3c	\N
3cd9a53d-46e9-41c0-beec-976dce876f61	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	1ef99036-7b05-4edd-8e1a-beabe6c87e00	\N
57589fab-9655-4c48-a437-9c45676e8865	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	b1c449d2-fc69-42fd-9d39-24fe0e956cd5	\N
9fdf8f0f-3f58-4b1b-bc0d-5073b1474469	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	234fe484-a349-435f-b9d6-8c133a1bbb61	\N
4f661f34-34d8-4e5f-b88e-c494db484931	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	47cc862c-cca5-4fb8-a601-48cddac14537	\N
2a4720f3-319d-45da-9829-d49d8fe8c0b7	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	cbdbc453-b141-4a9c-8f99-4ef7f1cf7b99	\N
cbf1d545-7ff3-4dd1-a3f0-b7546c3841c7	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	8fff5ede-9bbd-45d8-8a0d-7f25ce5cfa21	\N
8f54a3b0-7d24-4ee3-ae50-c291b3866ea6	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	b990de7e-449b-480f-9e6b-66f75093d6f1	\N
f61bff39-e359-4b48-89d8-6890a68acd7b	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	a505b200-acc5-4df8-83b5-83bbcf9ca76a	\N
e92af870-bba6-4f9c-b257-4d4ef6fd9ee6	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	1cd95d1a-afec-4471-93fd-1f71822590f4	\N
e222efc5-17ba-4d86-b644-bf5101be8d34	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	6bd9b4ea-6441-4504-9331-46ca53b1e07d	\N
1ccff1d2-6fb2-48da-bf1b-5f03c0cf17d2	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	ab7286ce-e515-43dc-8808-78b0a776aec1	\N
6ee29c6e-1066-40a0-873e-cd88cb75ea04	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	b2ed973b-2879-49f8-b972-46106f1acc25	\N
2288049a-c313-4289-9bb0-18a57579aec7	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	a0ef2a41-df44-4c54-9c05-ac285ba60053	\N
c0579d15-453f-432a-a749-485d2357683a	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	b21303f1-8d35-469a-a9ee-1b509a105516	\N
55efb50c-7727-4451-8456-92b7c08a5feb	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	895901dd-d6c2-4d68-8187-c21b756addf6	\N
1b126377-73a2-42b1-8971-ce9634cf591e	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	2675b6fc-d0e7-437a-94fb-26ae88eb32a0	\N
c1cd230c-44fe-464e-ab8a-99b7d30c7251	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	94a7a9d5-541d-4eb2-acf4-9ae1ab010949	\N
bfe48c5c-4814-43cd-8fab-095ac78cb245	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	7cee4d37-c439-48ae-866d-08b172f3aa5a	\N
5440cf21-b27d-44c4-a352-52017223d80c	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	17fff2fa-527c-438e-8160-9de4520c071e	\N
53608be8-2d77-4e2c-9ad4-6a1f92dbb9c4	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	c6751389-4059-4fa4-9bd8-c4e26920447e	\N
13161e67-9704-43d7-9320-32c4c2d7cd74	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	91a390b1-8594-436c-be26-eb1553dcc67f	\N
b46e678f-a5f6-4869-ac2e-1aebf2dee047	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	b6a8a922-c329-47a8-ab60-0681a3069d22	\N
afbe1bb0-89ff-4113-ba48-eb06ed0d0bb9	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	94fba3f0-04db-43bd-bdfc-37ccc338a768	\N
b3130035-d6d3-474f-a7b4-ddcc71283ba6	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	ac544c56-f8bd-41db-afe8-0340aff6f445	\N
1851ef16-24c8-4ed4-a1e1-56e83fc62859	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	6f00207e-41dc-4254-ab5a-a0b51cb23ada	\N
839104b8-6885-4e50-892f-a552f400f8f8	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	15ac9986-532f-4f5b-b7f2-74ec73eab619	\N
93667f8c-6f94-468a-afc6-45457e25a680	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	42338b49-d43d-43ea-bd7f-35ddc47c0ad3	\N
2eb7ccc7-47f5-475f-ac9b-cb1e41943a32	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	65d43415-8170-4c7c-bdfa-254b87a5f749	\N
901286e3-bff6-4114-aa1f-653feab3f10c	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	f2585d84-a48b-4e03-9461-142af2b3fee5	\N
ae89f20e-fdba-4432-9fa0-74bc9f4a8299	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	f166d986-5f12-489e-9c50-8b3039f823c5	\N
62a57b63-75ed-4f3a-8bae-afcf38b43c7b	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	c357e785-f5bb-494d-b13a-16a3ac394ab1	\N
fab5fe8b-cd23-4427-a3e0-98ebfe41403f	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	0a731b8e-cbd4-45d4-a4bc-291ab263024e	\N
a930bd91-9f8a-48d6-b09d-1b2c4f95e4a8	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	d22cd741-893b-426e-8c6b-bd6f16fb1f60	\N
322efa68-4d27-431a-a477-058fede33e8b	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	58876d14-2a0a-42de-9edc-33998737304e	\N
9aaf24b1-7cab-41db-8bdf-69473aef079d	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	18f54fb2-6290-48ea-802c-1e5c1609d508	\N
5998fca7-67da-4742-9d52-7bb0010907e6	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	1c115965-1379-4b40-a35a-b45267d36824	\N
85e670d3-de11-4c7e-b8fe-1738bd016f3b	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	6136c963-1d63-4f89-b4d3-df17e7f8c9e6	\N
1d376f2b-7a47-4741-b825-ef4d430f8adb	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	d2c384cd-47b8-42a5-b552-59d6c3ff63e7	\N
ededd2d0-dc82-4f6f-a9a5-605d8bc5a0f5	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	2717397b-40c3-498e-a06a-5944aeef42c3	\N
9fcceb6e-80b0-48a1-bcc2-96fbdbb968ba	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	28082dd6-03c8-4cb7-a520-dae0e861e941	\N
1d9d01ec-d07a-4f9a-b107-f0837f9c74ec	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	2c0e25ea-072e-4dbd-901e-7cb974ebf445	\N
3a0e98cf-e97c-47a3-b248-813b7129e362	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	49e62c50-b146-4d4b-a328-fc3d0fb059fa	\N
a88d59c8-748a-432d-ac3b-4fc273b479d0	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	5ec69631-ace6-419f-8692-a1faa99bfb2c	\N
85fe7295-32f0-423d-a4da-2d7e23090ac7	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	ec80b636-5b73-4880-9684-5c276dc5ba7d	\N
b0da1436-6054-4b91-8741-3848303081f7	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	cd07d04e-92f8-4211-8010-efc0c0b978b4	\N
c388396b-2eba-4521-bd83-33846fcf1c1e	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	02b8d561-e422-46fc-887e-4501a6286289	\N
530f9912-275a-4359-8c80-9c0ac83512ad	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	19787db2-2202-421c-a494-91b72caa4ad6	\N
0a454da3-a43e-4b77-8d98-a5086ddcd12a	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	a4f317ee-c872-4c1a-a114-3cbd991301de	\N
288c8dcf-759b-4824-bd54-8b10fef71179	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	889b6aa7-da41-42f4-b491-4eeea0bd1f15	\N
71eac386-0fe5-4d0c-be07-ca51298a2fa5	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	23a892ff-1a93-4ffe-8fd3-8ce7ebae5bda	\N
ec078f41-4c97-42be-b78a-fbfb33c59cdf	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	b701d280-2621-4555-bbfa-975ecc4ca077	\N
9bbe9530-f178-4c50-997d-82d9585b3e53	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	250cf3f0-a0ed-488f-ab21-c526d841d23a	\N
b884d413-a167-40c6-9683-57320ab33ed6	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	b73ebebb-45d8-4613-b48b-90b3b56b12b6	\N
12eede7f-6751-4240-8c21-21029aeea244	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	cda30bc5-cac4-4eca-b400-0c9902a8987c	\N
af0a4cdd-073a-4ca4-9502-d11dfdb93991	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	3d9c2ea3-0747-4313-84b2-16ba943d17ca	\N
3d717a51-6f53-467e-8230-977da65d09f6	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	eaf7ee94-5cb7-4807-9742-1773ccccb3aa	\N
cca6c439-bd23-47dc-bccf-4a572c8a8760	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	bf2f840a-0d0a-4474-aa19-9c2093ca35fd	\N
a4f1ec45-8717-4dbe-8b4f-b2aedaf0c56e	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	8f0cbb05-e69b-4b7b-a7c6-13a5ea4218dd	\N
4126e6cb-b4c5-48d7-9e8a-79f1db877b0c	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	4ce88d03-c4bd-470c-a1df-82c257e87632	\N
ea355d9d-0126-41d1-b23f-95381267906d	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	7e367fa4-b432-4ea4-8f32-ec70557bdbf5	\N
e6fd55ee-e9bd-4ca9-a357-2c736cd499c3	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	d7f6b9fd-90ee-4356-99c6-d57a3aaeb3d8	\N
0966d383-d162-4100-b4d0-00e6b59b2250	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	ab6dd659-68a6-4017-a8b7-8f2ab2262440	\N
8ecf9645-d13a-4f38-8d64-a3a1a34f24e0	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	f255f5c2-8515-419b-8c5c-f806d3befc7b	\N
2d767179-e89f-46fa-b3c1-fb73bec601ae	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	40c9430e-0065-4a42-9bf4-5cf3bde10629	\N
1340f87c-ea88-41cf-a62f-ac72f42fb8c3	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	8ba82ae1-5594-4c89-a4f2-7d9b6642d7f6	\N
c83da22e-a730-4095-a334-f0ee3174565a	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	338f4980-000b-4c38-8533-abd111cf8390	\N
6a4e42eb-5675-4d4f-8040-c8b191224c12	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	3edbf46a-9056-46ef-aa0b-35d68e8073ba	\N
663599e0-cf3b-4fea-9ab8-ddf3c4ef8e67	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	8ce2a090-2c69-43ff-961e-7ade5ab3d0d8	\N
556458b2-1583-47dc-add0-f1c2f8d02849	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	12712147-9e5c-490b-9f4f-5759e555cbe8	\N
8e3edd2e-cf55-45d9-9637-211984055fab	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	132dabf3-8c1c-4a3a-88c6-39dba8f7f9c4	\N
972c47b4-6f7f-4f51-9e8e-73c1340a14cc	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	0a79be8b-0c46-4cfc-ba38-3ad93f7d07d8	\N
7bd80dbb-35e2-4adb-b614-bf76e5e883ae	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	e3f423b6-878d-4a3d-81ce-c6a519d54697	\N
c73fdab0-f6cd-465d-9ce7-9b275739af35	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	5d076ad8-068d-4c83-a66f-362e6ae67724	\N
f75b08ae-1c94-4ddd-99eb-c5d0a6db7c8b	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	a8114d51-f856-487e-a7de-280239eca496	\N
b1ddfec4-64c8-44e1-a329-6ecec92cfe69	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	73154662-9703-4b9e-b600-9adbe23d905a	\N
a09bbe42-47b9-4ccd-91e9-0bde6ecce800	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	00c4b25d-f3e5-4828-9aa6-d33d65436bd1	\N
02bd11fc-7c53-47d4-a22f-fb398be6bd1e	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	27a3ac3a-b85d-4d36-967b-9e666cc9991b	\N
1564f12e-3599-4e86-b725-06906544666a	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	99030627-37ea-4f3e-b3c0-2e27cb73dd97	\N
99431740-c3fb-42db-9c47-230a7a137e35	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	151e2913-6135-4051-9af0-6b8e7b372ff7	\N
19c59334-0615-4dcd-96d9-2eaf22124c75	120000	30d2b059-716e-445e-ad20-bd7341d7adda	7bfd6290-8c5c-4ffa-bd79-d377e21341de	\N
d3bf1ccf-c70d-4b15-b930-9b6d45d859d8	120000	30d2b059-716e-445e-ad20-bd7341d7adda	64fcdd03-799f-44f8-ae27-37cc7245ed43	\N
f9779f27-c6db-4d6d-9449-7cef4e9f2e51	120000	30d2b059-716e-445e-ad20-bd7341d7adda	0f97c71c-21b9-4c4e-85ca-628ffeaf43e5	\N
910afefe-4abf-4561-8b5f-e89846027d81	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	823b3273-37d8-47f2-a5f0-ec412fa5c79f	\N
fe9710a5-0987-4cfb-95a2-e782eaeab10d	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	84579b6d-700f-4cc9-9885-76a418f897a1	\N
56d4af43-8f9b-4926-aac9-080c130855b6	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	368d86e7-757a-47bb-8e42-35b0d2f463c2	\N
2b43d1df-8d16-4eb8-940c-7e0e328e1bdd	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	d7a93394-50eb-4595-abcd-201b186f5c76	\N
e1fa998a-c393-4dbd-a5eb-07f9ce4069b1	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	dca3fce8-baf0-46df-b313-12479507d844	\N
6b59ca63-ddc3-4e14-b3ad-3c902da067f0	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	4b8e0df0-0400-48b2-b02c-cab197830025	\N
f9401925-3277-44d8-8539-b71856510199	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	e54427da-9975-4077-8fd9-ef7647c29562	\N
063f6a38-d92a-4bee-b804-f80d9d8daba6	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	1c4e5490-7d6d-46f1-9e0e-54619e240ca3	\N
48d5a29b-39ee-4de7-a1ce-f0c300b1ecbf	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	c0ee3853-345c-4bef-9de0-ff6120126b89	\N
8371cadd-0fff-4f7e-a01a-112de6ca48f0	0	2d6872c9-b890-4d8d-9434-fbc6efccdd62	c0ee3853-345c-4bef-9de0-ff6120126b89	\N
4e5eeca5-f96e-4ddf-8016-53e068e005c2	0	2d6872c9-b890-4d8d-9434-fbc6efccdd62	3ce8bf21-a73e-4dbc-97ee-fadee8ba75c0	\N
38429edc-2db0-4dd8-8037-9671c046d60e	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	d5314198-870f-4664-85cd-1bf7b8208e63	\N
a5bf74e3-a2b1-4063-a40c-529b0bacefc8	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	dc302168-a19c-4ff6-9c02-a06eb371b2c0	\N
b87b79d1-fdee-4b42-b4b9-3405f6ae4900	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	4b011441-08df-4e8f-b613-9b0bd5cb8faf	\N
324c3e60-77cd-4e4b-b1f4-298672fc847b	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	28ab0bdc-1e25-43fd-98a9-f340364473fe	\N
26e991eb-0835-439d-9c88-057ddd840d95	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	559f3b0c-f43e-4009-b312-73d2b6324139	\N
ae0408ab-1f40-46b5-a948-e19c8face068	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	517377e3-304d-4479-a341-fb0831a5504b	\N
3d524e26-2d74-4779-8cc1-dd6996e3f476	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	fc3e68a5-f731-4c44-8438-ce7c2738d319	\N
995936eb-dcde-4d54-a188-ff9aff090e97	0	2d6872c9-b890-4d8d-9434-fbc6efccdd62	131cf421-dba1-483f-8a36-d0a425bfe0eb	\N
81340baf-b592-45f5-9f9c-6b5e72fa1c4a	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	11f250a2-4905-4a91-bdb1-afcfd1d4dcdd	\N
ca52177e-f313-423a-abd6-2fe23f726469	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	e78436cb-25e7-458e-8305-d3c195ea251a	\N
53f786b9-36bb-4430-b342-1b4d92f550d4	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	18b2bc45-76e8-4072-a38a-eb874776f407	\N
53951957-8a17-4b43-8fa6-29a5b0467826	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	5d6bf7e2-9c6d-4ae1-a2a1-6ca4d39bb1ea	\N
0e7ccf0b-8b21-47dd-9f4c-23ea4c53a92b	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	99e5d08d-73c7-4394-ad41-7e687016eada	\N
565c2c17-d1c6-497b-a727-171348f78019	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	881dc5de-1fc7-4b6e-973f-a47eec3717e3	\N
11d1ab8b-73e9-424a-a744-3132ea1ba17a	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	3eb782a6-0464-4b32-8b61-b3977f82aa87	\N
a57777a8-2866-4034-ac30-152c99e56561	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	58ae9a53-b347-4ef0-96f0-9048a6709b9c	\N
5b3e376a-7157-4531-8018-6c549aa8b25e	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	fafd79be-b41b-4e17-ac3f-469c676a36f6	\N
aa394538-5610-425c-98ba-d80504975bcf	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	8b612a2c-095a-488b-acb2-2cfadb3e6886	\N
2c3a702a-734c-46e1-992f-a217c3c709d0	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	848d5cc4-a309-45ae-953d-9c4a3fbea256	\N
a65960c5-8343-4c46-aab3-ef2556154633	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	3e974902-ea92-4331-ad33-80802201e2c9	\N
3cc695db-3d91-407e-892a-6c0aeac500c7	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	ca289729-775a-4a5f-b77f-9fe413b299a5	\N
f0fe7d8f-17e6-4797-a6d1-87fe855ea207	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	a37bca01-56a2-40cb-b272-3801624eddc9	\N
4f956884-9bcc-4e48-8850-99fefa110d46	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	a84019c3-9c64-49d7-88cd-747b8a57b223	\N
eb3ef6d1-3054-4b84-8fbd-cda3935263ad	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	8d7de2d7-bb7a-4381-bd89-33e79f9a409d	\N
a44beb94-f499-4703-87d5-78b39e5d6834	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	81833e28-e436-4225-b4ba-daf82d615d96	\N
32a6feed-ddd5-4d0b-87d9-12b6da656cc7	0	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	14aabb63-dfaa-4497-b140-a9c21954a01f	\N
2b24767c-023c-49da-b076-918535dcf9f4	100000	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	fb47c1ce-9f81-4f63-a04e-7deebc9038bd	\N
19f40dc3-3bb0-4515-b6cc-53f034db24a2	100000	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	eb151481-075b-40b3-a23c-ec53eff6a37f	\N
a7e70af3-1ddd-4af5-8c85-c100fb559fa6	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	987e8715-2a41-4b9f-a8c5-afee411d8c0a	\N
7b0203ae-427d-4a31-979d-d335de2363f7	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	5fd772d5-a4b8-4b6b-9c77-65c012fa725b	\N
83d5991e-0727-4267-bb2f-a2cd1da64863	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	63ed9a6f-1895-48f0-92b8-7ad6314c5a6b	\N
c395b17a-ed1b-4bef-8d6b-76bab69b5174	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	6bfdefd3-49a7-45e0-a375-08fa1fe4753d	\N
ef227cda-a055-4435-8eb3-6af735e15b79	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	fd337f84-5a2c-40bd-9862-0f95ea71a69c	\N
36c6b181-e5c9-4c06-8e95-533d470e3edb	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	7c4ef966-a91b-42ab-aee0-3b51f5b1baf4	\N
d613fd54-ddf7-4424-9cba-953c11b0965c	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	62d7a0ed-eb6b-41c1-a265-605d17d987e2	\N
a0c24ad0-00e8-49a9-9d43-964575e21929	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	e5a32791-4354-4ff6-911e-d47f44abf702	\N
8422e034-c89c-42f3-9ecb-97ce948d812b	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	f967d453-a644-4f5c-baea-917fb8be0fd7	\N
1ea3071d-d569-42f0-ab60-e626f844c38e	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	8222128f-02df-4fd3-820d-ffe6d03d2900	\N
e23dd62c-54a4-4994-8d59-42fd4d44d31d	100000	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	2e9a7c02-cfc3-4a7b-b21d-9219066c96db	\N
ca391d00-0715-424d-bfb3-4a45abec7502	100000	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	ada37d79-6d7e-4359-8a97-0cc9640d2955	\N
f641bda6-f261-44a1-a36b-50973b8170b4	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	898b597b-5ac3-4e02-b73a-754ca882d3de	\N
2aa36523-16bc-4434-a7ca-b9e5920d0bc4	100000	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	6a15b8fb-8909-4f50-96d7-b85c009d2e39	\N
f64d2c1e-f253-4e2f-a236-b47dee939f81	100000	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	30337e07-868f-46ec-90d1-7fa3e7da6669	\N
f4fdeb5a-13e1-40ad-96f3-85f77eda5e44	120000	30d2b059-716e-445e-ad20-bd7341d7adda	017baee4-df4f-4143-99d3-62e29970862e	\N
5e44b59c-5356-43dd-8972-cc784ccefa9b	100000	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	60173099-4a7f-4a28-ae20-305f199ab2c3	\N
4a17e668-4cc0-4991-8824-bc2617563e33	100000	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	86587b23-3f44-4948-b75d-eb07a4399ee5	\N
7e1db4cc-4ef3-4996-b9ec-915d7c6f4c45	120000	30d2b059-716e-445e-ad20-bd7341d7adda	86587b23-3f44-4948-b75d-eb07a4399ee5	\N
28ffc47d-ff9c-4749-9e79-77e11470207f	100000	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	8df01930-3a42-42b1-b923-5559cd3bed50	\N
c95a8d94-d1f5-41e7-a6cd-e82581aefb14	120000	30d2b059-716e-445e-ad20-bd7341d7adda	8df01930-3a42-42b1-b923-5559cd3bed50	\N
f7b0433e-68cb-4012-8b2d-40b94b179ce4	100000	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	f530d3e1-aac3-444b-980b-9cce39720797	\N
b53baa03-3f35-4b09-a3fd-acd8f285bf83	120000	30d2b059-716e-445e-ad20-bd7341d7adda	f530d3e1-aac3-444b-980b-9cce39720797	\N
72bb4dd4-e0db-4fba-bf42-bf00962d3c0a	100000	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	758a77c2-9957-45e1-9ce5-b5371a6ed84c	\N
146ebb4e-d130-46d0-8615-c408ec70f6cd	120000	30d2b059-716e-445e-ad20-bd7341d7adda	758a77c2-9957-45e1-9ce5-b5371a6ed84c	\N
72d701d5-31e4-4895-8a39-f8e7c752eb59	120000	30d2b059-716e-445e-ad20-bd7341d7adda	d06f21bc-102a-457f-ace3-529ad7dd8385	\N
4681f631-7a26-4413-ab9c-1ea6cd0a0be5	120000	30d2b059-716e-445e-ad20-bd7341d7adda	8ab94c14-ec20-41f9-bb92-1245efd135cf	\N
b6eb230e-7d89-43a0-9d42-09b9c78f7fb8	100000	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	11a173c1-971a-453e-b9c7-e0d6c4ec5f9f	\N
3f4e3c72-27b2-46d7-841f-4a94b8ba8053	100000	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	62981fe7-a3d8-41c0-8be0-3e437b497f38	\N
e7f1952c-e117-48a3-b4c0-31b7ba875be6	100000	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	27861eb3-d6d8-4d15-aa4e-6a357ea6a082	\N
de8ddb93-001f-4ea8-8d1d-7cd5c8ed4dc6	100000	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	c9ca93d8-e755-4021-b89c-091e91f5d3ee	\N
7dc852a3-8a7b-460b-8bcb-ee498a3765f9	100000	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	fef322ff-8236-4587-8af0-3ef2bbef3c14	\N
03edb146-c947-4565-8c15-11529270f123	100000	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	77b5608d-988c-446c-9a27-1e150cf5b714	\N
5ba60be6-3d09-40a6-9f7f-c7ea3be8c4fc	100000	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	fd63546a-7655-4528-9f8f-4c3615379638	\N
b9806170-5521-45c8-ba6d-25f9c6d74318	100000	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	b7d637f1-8f1a-4743-8360-113d58a82ac5	\N
ab8c1e47-aa90-4de1-bbaa-f7b187271d06	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	1ba506c5-2c04-44c7-bb0f-d3a27586793d	\N
d3ba2126-7157-4737-a1bd-905d4619118e	100000	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	fdfaac82-64de-4e9a-bb60-4b87b336ada1	\N
2e1af624-82c5-4151-bee2-9148abcc3885	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	4128eeaf-6a3b-4fc6-8cfe-c32dc876f7f5	\N
c18af6fa-7d39-4d03-858d-7d688d673d78	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	1aa4df3c-19ac-43b5-89cb-314d49004bfa	\N
3d98955d-2969-43a0-8e8f-170af161adbf	0	2d6872c9-b890-4d8d-9434-fbc6efccdd62	931385f7-358b-488e-9994-580c8febc6fe	\N
4b825896-0868-49db-bf55-d0fec8a72137	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	1939e94a-c549-4933-8329-58138e899db7	\N
dc336b0e-9415-4fd4-93e7-2ffb06c28d9d	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	86a819d8-850e-453d-bc95-9bc3b0d27f1f	\N
b90943a2-94cf-4c78-9838-0c86397e7b6e	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	02255a47-995d-41f7-a10f-190cf58dd3df	\N
e484f58e-f9d2-4f47-a8e6-903141597832	0	2d6872c9-b890-4d8d-9434-fbc6efccdd62	3fb2b3dc-7651-4777-8447-a86cdbe6f89d	\N
cc41f305-a494-4e4b-bd7e-99884a3bbb98	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	3029226d-eb26-4c79-a5ca-641ba2ea591d	\N
ac7de452-1d84-41d4-a435-22800be63ecd	0	2d6872c9-b890-4d8d-9434-fbc6efccdd62	c618c7d0-38a5-4e53-9c43-db06a65dfc14	\N
2caf645f-82c2-4405-92d7-c517f3e10774	0	2d6872c9-b890-4d8d-9434-fbc6efccdd62	3d75d228-2883-45f1-a6ee-890146ebe335	\N
8dab7a90-99e3-4dfd-9e2a-e9ec0a684d7d	0	2d6872c9-b890-4d8d-9434-fbc6efccdd62	aeb6c63d-2f19-443d-80c9-376a229c0867	\N
d3da9fcc-da7b-4a88-a648-38b1e720a7c5	0	2d6872c9-b890-4d8d-9434-fbc6efccdd62	b1a2e47e-0ee3-4997-acde-df3f2a89e2da	\N
36ffa996-6bc8-4191-a57e-a2b4993a8dc7	0	2d6872c9-b890-4d8d-9434-fbc6efccdd62	7cb3d12c-3c68-406a-9d6c-fb49592f286d	\N
2a318f9e-cf3c-417e-a5d4-dd5287b74ef5	100000	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	95e0cd93-bd55-4aee-8fb1-b6cc92b57461	\N
6eaafbf9-162a-46d0-95c4-1d11b99a899d	100000	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	7a6043d9-ee78-48d9-9521-c60849b09cf3	\N
70feab22-4c30-4ddc-a8c2-4a5c1da00b88	0	2d6872c9-b890-4d8d-9434-fbc6efccdd62	174ba5bc-2eec-4910-a901-6cd12771b996	\N
01a13988-f029-4c2c-a1a4-b8f384140667	120000	30d2b059-716e-445e-ad20-bd7341d7adda	174ba5bc-2eec-4910-a901-6cd12771b996	\N
f44dbd67-f447-43b8-bedc-5da3b21ace32	0	2d6872c9-b890-4d8d-9434-fbc6efccdd62	9ebda485-9ea0-4c1d-a8f0-83acae2cb8b2	\N
2554c004-0b49-432e-a483-e99d89dddfdd	120000	30d2b059-716e-445e-ad20-bd7341d7adda	9ebda485-9ea0-4c1d-a8f0-83acae2cb8b2	\N
dec82e4f-be43-4026-a886-59dc9fddfbd9	0	2d6872c9-b890-4d8d-9434-fbc6efccdd62	03499bc1-90bb-4f16-9bb2-a8be0c999f20	\N
fef52386-ceea-4107-82cf-f88bce80310a	120000	30d2b059-716e-445e-ad20-bd7341d7adda	03499bc1-90bb-4f16-9bb2-a8be0c999f20	\N
e89010b3-bb13-415a-b2bd-816696432b14	0	2d6872c9-b890-4d8d-9434-fbc6efccdd62	428dd956-5451-491c-a5f2-62428809a470	\N
f85028f8-7217-4981-a93f-b03d9c26579c	120000	30d2b059-716e-445e-ad20-bd7341d7adda	428dd956-5451-491c-a5f2-62428809a470	\N
b5a07c49-ccee-4825-8c15-1fc30a4862f5	0	2d6872c9-b890-4d8d-9434-fbc6efccdd62	a494c501-b1cb-4293-b8e5-4a2bf57a1ca1	\N
8d7548a5-b529-4292-bf5e-d89dd3c73a68	120000	30d2b059-716e-445e-ad20-bd7341d7adda	a494c501-b1cb-4293-b8e5-4a2bf57a1ca1	\N
ce9bbda9-d700-4094-a06b-ff8b7c0e5e12	0	2d6872c9-b890-4d8d-9434-fbc6efccdd62	e878ed06-36b5-4bf7-af5b-c24de4ab1490	\N
d86f3231-4a80-4766-80ea-856f06f63ac1	120000	30d2b059-716e-445e-ad20-bd7341d7adda	e878ed06-36b5-4bf7-af5b-c24de4ab1490	\N
023f5f77-6ff8-4866-8d44-f8acbd31e19a	0	2d6872c9-b890-4d8d-9434-fbc6efccdd62	67160c19-5aba-425d-a267-86552c06bc1c	\N
e4379a31-7785-407f-8b46-cd7976531ba8	120000	30d2b059-716e-445e-ad20-bd7341d7adda	67160c19-5aba-425d-a267-86552c06bc1c	\N
41f9ae60-afed-4bbd-8a48-a7c298cbaa62	100000	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	5dd2336e-5ecd-468a-86c7-a9c71370725c	\N
5ed907ff-b623-4f1a-8da6-495af512b77d	0	2d6872c9-b890-4d8d-9434-fbc6efccdd62	41406213-d06d-4ccb-aa99-3f907d7d2c13	\N
4d1b195f-6082-478f-b025-326bacc5959f	0	c5bcd53f-a8c5-4f76-8fc7-288705cac018	b4c33bc7-a687-41ce-8302-405b6192c9e4	\N
7ee30c65-fdab-47bd-ad5f-7d1d9f1e52a1	0	c5bcd53f-a8c5-4f76-8fc7-288705cac018	d13718fc-edb2-4640-92d7-058c62b300ee	\N
ca50bf6b-b112-472d-a20d-f47f24389cf1	0	2d6872c9-b890-4d8d-9434-fbc6efccdd62	a44d2561-17e5-4ab7-a713-f35dd798cdda	\N
2347c30d-9757-4d27-ab45-1bea718dc04a	0	c5bcd53f-a8c5-4f76-8fc7-288705cac018	b68b3c7b-d176-4079-81a3-f195c79b52b6	\N
c5199d04-c554-4331-883e-d92393fee2a9	0	c5bcd53f-a8c5-4f76-8fc7-288705cac018	81ea7dc1-2e14-4e9f-85c1-20481aea31cc	\N
b58691ab-5d94-4684-bc86-cd0d43301f0b	100000	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	e52f5993-f027-40ed-950d-0590e296ae32	\N
1acc8eee-959d-4fb0-9250-e8605dfaaa6e	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	f9b6dbc2-a7e4-4dd8-a440-48373571fef6	\N
6027408a-57d6-4301-ba35-19eac0a2db10	0	3c7e4cc0-461b-43c3-95ba-74936720383b	3960c74d-0fcf-4229-9613-b21427236a09	\N
434e721a-da72-40e7-abcd-aebeccc4540b	100000	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	a842b896-e045-4e24-951f-5084383c1a1f	\N
32f5aee5-0c48-4755-847f-4b11a279c925	100000	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	44d60be0-0b29-45c7-a868-1bbfab33b40e	\N
e4636d97-0f3c-4849-959e-8e9ce9cdf66b	120000	30d2b059-716e-445e-ad20-bd7341d7adda	2ae512b3-2f9e-45b9-b8bf-3724cc29982c	\N
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.payments (create_at, update_at, create_by, update_by, delete_at, id, pay_type, payment_status, amount, pay_info) FROM stdin;
2024-11-25 12:17:56.679849	2024-11-25 12:17:56.679849	\N	\N	\N	c4af2582-c56c-453f-8676-cdd325920648	VNPAY	f	120000	\N
2024-12-05 08:11:29.966151	2024-12-05 08:19:40.515413	\N	\N	\N	2e507be4-124b-4c4c-9962-73bddacfd940	VNPAY	t	120000	{"bankCode": "NCB", "cardType": "ATM", "orderInfo": "Thanh toan cho ma GD:00d09912-45d9-4c5f-bcfc-8e6522c6eab6", "paycheckInfo": {"vnp_PayDate": "20241205151924", "vnp_TmnCode": "X6DNOALK", "vnp_BankTranNo": "VNP14722280", "vnp_ResponseCode": "00", "vnp_TransactionNo": "14722280", "vnp_TransactionStatus": "00"}}
2024-12-05 08:22:40.604637	2024-12-05 08:24:05.407992	\N	\N	\N	54454b6d-3110-4d04-995a-a33edd4b6011	VNPAY	t	120000	{"bankCode": "NCB", "cardType": "ATM", "orderInfo": "Thanh toan cho ma GD:e94b2041-6c17-40a2-adef-3039b962a29c", "paycheckInfo": {"vnp_PayDate": "20241205152349", "vnp_TmnCode": "X6DNOALK", "vnp_BankTranNo": "VNP14722292", "vnp_ResponseCode": "00", "vnp_TransactionNo": "14722292", "vnp_TransactionStatus": "00"}}
2024-12-05 08:29:32.925797	2024-12-05 08:30:27.497062	\N	\N	\N	376b3970-e064-46c6-98eb-8134181926ab	VNPAY	t	120000	{"bankCode": "NCB", "cardType": "ATM", "orderInfo": "Thanh toan cho ma GD:03792e58-92a9-4cc0-be00-2289272bc03d", "paycheckInfo": {"vnp_PayDate": "20241205153014", "vnp_TmnCode": "X6DNOALK", "vnp_BankTranNo": "VNP14722317", "vnp_ResponseCode": "00", "vnp_TransactionNo": "14722317", "vnp_TransactionStatus": "00"}}
2024-12-05 12:25:14.541728	2024-12-05 12:25:14.541728	\N	\N	\N	ddcadace-81ff-4c22-9915-ca1bba7d6619	VNPAY	f	120000	\N
2024-12-05 13:02:44.337236	2024-12-05 13:02:44.337236	\N	\N	\N	2630b3a0-140e-4395-898d-3c4c590fefdd	VNPAY	f	120000	\N
2024-12-05 14:19:09.25272	2024-12-05 14:19:09.25272	\N	\N	\N	b8a3ea66-64ac-450b-9a89-3039cc37dcf9	VNPAY	f	120000	\N
2024-12-06 06:11:32.837108	2024-12-06 06:11:32.837108	\N	\N	\N	3fcd769b-470c-4284-8104-2415b8d3fe55	VNPAY	f	120000	\N
2024-12-06 06:11:36.127733	2024-12-06 06:11:36.127733	\N	\N	\N	b3db6f7d-3657-427a-b328-8ca342abcd79	VNPAY	f	120000	\N
2024-12-06 06:14:01.93323	2024-12-06 06:14:45.374343	\N	\N	\N	f3349c57-5f31-4582-9e1b-21fd3166df3c	VNPAY	t	120000	{"bankCode": "NCB", "cardType": "ATM", "orderInfo": "Thanh toan cho ma GD:7f563a52-b204-4270-965e-44081d9d386d", "paycheckInfo": {"vnp_PayDate": "20241206131429", "vnp_TmnCode": "X6DNOALK", "vnp_BankTranNo": "VNP14724649", "vnp_ResponseCode": "00", "vnp_TransactionNo": "14724649", "vnp_TransactionStatus": "00"}}
2024-12-06 06:17:23.687237	2024-12-06 06:18:19.956206	\N	\N	\N	91c5ce58-1385-4b26-abb8-ab6ce1c899ce	VNPAY	t	120000	{"bankCode": "NCB", "cardType": "ATM", "orderInfo": "Thanh toan cho ma GD:1a8935ec-10e6-4ce3-90bb-8944ddc60a2e", "paycheckInfo": {"vnp_PayDate": "20241206131805", "vnp_TmnCode": "X6DNOALK", "vnp_BankTranNo": "VNP14724655", "vnp_ResponseCode": "00", "vnp_TransactionNo": "14724655", "vnp_TransactionStatus": "00"}}
2024-12-06 07:37:09.78828	2024-12-06 07:37:09.78828	\N	\N	\N	fbc3f79c-a31e-441b-8515-24024efb7364	VNPAY	f	120000	\N
2024-12-06 07:57:17.818742	2024-12-06 07:57:17.818742	\N	\N	\N	ae9349eb-ef63-4af4-9acd-ae710c7b668e	VNPAY	f	0	\N
2024-12-06 07:58:12.297804	2024-12-06 07:58:12.297804	\N	\N	\N	364d22dd-56e5-47b0-a03c-5d662b4bd506	VNPAY	f	120000	\N
2024-12-06 07:59:40.163067	2024-12-06 07:59:40.163067	\N	\N	\N	88c18b1c-4b9f-4c04-82eb-6da4af9e9f36	VNPAY	f	0	\N
2024-12-06 14:56:35.276471	2024-12-06 14:56:35.276471	\N	\N	\N	8ded438a-9fc8-49d0-8dfb-4b8adf9aa52e	VNPAY	f	0	\N
2024-12-06 15:00:33.000906	2024-12-06 15:00:33.000906	\N	\N	\N	5086590a-3528-4c09-b87d-0bc80283f668	VNPAY	f	0	\N
2024-12-06 15:02:58.725327	2024-12-06 15:02:58.725327	\N	\N	\N	de7e054f-cdef-41b6-bedc-7975edfcb169	VNPAY	f	120000	\N
2024-12-06 15:03:36.348987	2024-12-06 15:03:36.348987	\N	\N	\N	9a8c8a71-1ae6-454f-be3c-7132e2b0db02	VNPAY	f	120000	\N
2024-12-06 15:07:41.090337	2024-12-06 15:07:41.090337	\N	\N	\N	13274f8c-6bb5-4f52-8487-bb6b6a71e6f9	VNPAY	f	120000	\N
2024-12-06 15:34:07.858172	2024-12-06 15:34:07.858172	\N	\N	\N	18ac8f6c-1789-4603-becb-cf7342d4d6c4	VNPAY	f	120000	\N
2024-12-06 15:40:23.469659	2024-12-06 15:40:23.469659	\N	\N	\N	d0e0b9a7-9245-4b76-adca-e5df994ccce6	VNPAY	f	120000	\N
2024-12-06 15:40:25.951082	2024-12-06 15:40:25.951082	\N	\N	\N	8bb141f0-5214-4186-a930-ee3f1c5aab47	VNPAY	f	120000	\N
2024-12-06 15:40:43.515513	2024-12-06 15:40:43.515513	\N	\N	\N	9e94a83c-43c7-4cff-b568-169c9a76875d	VNPAY	f	120000	\N
2024-12-06 15:41:24.003253	2024-12-06 15:41:24.003253	\N	\N	\N	6ef04b0e-d672-460b-9003-fe56461079b1	VNPAY	f	120000	\N
2024-12-06 15:42:04.114872	2024-12-06 15:42:04.114872	\N	\N	\N	b478ddd0-9530-4bca-9000-a485985889b6	VNPAY	f	120000	\N
2024-12-06 15:42:56.899162	2024-12-06 15:42:56.899162	\N	\N	\N	08ea80f4-8a82-4d5f-b090-1dbfaec93f07	VNPAY	f	120000	\N
2024-12-06 15:44:13.934879	2024-12-06 15:44:13.934879	\N	\N	\N	3ee4be78-6433-40c5-ab73-d1380669b25a	VNPAY	f	120000	\N
2024-12-06 15:45:01.248047	2024-12-06 15:45:01.248047	\N	\N	\N	b9c3e643-a9e6-4810-a366-f8221864f3f9	VNPAY	f	120000	\N
2024-12-06 15:45:14.862765	2024-12-06 15:45:14.862765	\N	\N	\N	ca3b4949-8b97-4afa-923e-321d57cad846	VNPAY	f	120000	\N
2024-12-06 15:52:55.52253	2024-12-06 15:52:55.52253	\N	\N	\N	5670383e-11cf-4754-9e34-faa3e93a3585	VNPAY	f	120000	\N
2024-12-06 15:53:42.151673	2024-12-06 15:53:42.151673	\N	\N	\N	f190bcfc-c323-4fff-8056-9f056286b638	VNPAY	f	120000	\N
2024-12-06 15:56:33.875284	2024-12-06 15:56:33.875284	\N	\N	\N	e9c7b2e1-f6e6-4c92-b9f4-8dc681774838	VNPAY	f	120000	\N
2024-12-06 15:58:27.227696	2024-12-06 15:58:27.227696	\N	\N	\N	ca324496-63d4-491c-8ef6-f6dc2e9b01e5	VNPAY	f	120000	\N
2024-12-06 15:59:02.678979	2024-12-06 15:59:02.678979	\N	\N	\N	220bf7b3-2e60-460f-8e3b-76baf507d44b	VNPAY	f	120000	\N
2024-12-06 16:01:02.196409	2024-12-06 16:01:02.196409	\N	\N	\N	9d368a53-226e-4941-bb18-ef02146d0461	VNPAY	f	120000	\N
2024-12-06 16:02:36.409118	2024-12-06 16:02:36.409118	\N	\N	\N	d0d48a51-a490-44a9-bbb7-a81033caa51f	VNPAY	f	120000	\N
2024-12-06 16:06:38.431651	2024-12-06 16:06:38.431651	\N	\N	\N	a22ba818-3d71-4016-81e1-29df482cdcfe	VNPAY	f	120000	\N
2024-12-06 16:08:07.801241	2024-12-06 16:08:07.801241	\N	\N	\N	d14911ff-36df-43ff-9ca7-3d8f10eb1045	VNPAY	f	120000	\N
2024-12-06 16:09:18.610525	2024-12-06 16:09:18.610525	\N	\N	\N	47f44314-0144-41b4-8211-e1f68d0ab9d7	VNPAY	f	120000	\N
2024-12-06 16:12:46.507488	2024-12-06 16:12:46.507488	\N	\N	\N	8d576d95-4f99-460e-9c78-962e6ee00191	VNPAY	f	120000	\N
2024-12-06 16:14:35.822949	2024-12-06 16:14:35.822949	\N	\N	\N	1b9767a6-ce94-4b71-be4e-ffa455830f0b	VNPAY	f	120000	\N
2024-12-06 16:28:43.658237	2024-12-06 16:28:43.658237	\N	\N	\N	4729db5f-bce8-4ba9-adae-d6d1a82757f8	VNPAY	f	120000	\N
2024-12-06 16:35:16.604939	2024-12-06 16:35:16.604939	\N	\N	\N	752ea456-9ba5-49ba-ac70-76f6d319ea21	VNPAY	f	120000	\N
2024-12-06 16:42:25.119345	2024-12-06 16:42:25.119345	\N	\N	\N	f4f7a863-a2f8-4ba3-9f4e-d50a73b28a8c	VNPAY	f	120000	\N
2024-12-06 16:43:16.343661	2024-12-06 16:43:16.343661	\N	\N	\N	f52ebe3c-676a-4611-b9cd-205a104e033b	VNPAY	f	120000	\N
2024-12-06 16:48:54.544962	2024-12-06 16:48:54.544962	\N	\N	\N	739b701e-ab21-45b4-8a19-63cd046d0694	VNPAY	f	120000	\N
2024-12-06 16:49:30.044224	2024-12-06 16:49:30.044224	\N	\N	\N	2c98c30f-94f5-4883-9df9-425a143bf340	VNPAY	f	120000	\N
2024-12-06 16:51:00.675428	2024-12-06 16:51:00.675428	\N	\N	\N	456886e8-ea10-4047-9476-389635595cd7	VNPAY	f	120000	\N
2024-12-06 16:53:18.446358	2024-12-06 16:53:18.446358	\N	\N	\N	f294c4ae-040b-4b17-aa49-aa7bf843b7ca	VNPAY	f	120000	\N
2024-12-06 16:54:41.074394	2024-12-06 16:54:41.074394	\N	\N	\N	89d5da77-b943-42cb-a545-437b7296fe6d	VNPAY	f	120000	\N
2024-12-06 16:58:00.316199	2024-12-06 16:58:00.316199	\N	\N	\N	f88ea687-9c05-4793-8d60-eb525ebbdde4	VNPAY	f	120000	\N
2024-12-06 16:58:54.832047	2024-12-06 16:58:54.832047	\N	\N	\N	01e79ace-6703-4244-a9b1-94137586b96e	VNPAY	f	120000	\N
2024-12-06 16:59:01.159358	2024-12-06 16:59:01.159358	\N	\N	\N	a8ccc849-4d8e-4218-a61e-c79047ddba01	VNPAY	f	120000	\N
2024-12-06 17:03:09.512077	2024-12-06 17:03:09.512077	\N	\N	\N	aa4921a2-c576-4283-8b2a-87b23197434a	VNPAY	f	120000	\N
2024-12-06 17:05:20.181381	2024-12-06 17:05:20.181381	\N	\N	\N	a7a58f25-1460-49f5-8451-9a226e4caddf	VNPAY	f	120000	\N
2024-12-06 17:07:40.610904	2024-12-06 17:07:40.610904	\N	\N	\N	cc2ec717-1f34-48a5-87dd-e76aa801cbbd	VNPAY	f	120000	\N
2024-12-06 17:09:21.205762	2024-12-06 17:09:21.205762	\N	\N	\N	98dcb610-9f61-48cb-8eb6-073d7a31dcd8	VNPAY	f	120000	\N
2024-12-06 17:17:02.665376	2024-12-06 17:17:02.665376	\N	\N	\N	83f2c11c-98be-443f-9a98-d86b592f8015	VNPAY	f	120000	\N
2024-12-06 17:19:10.628306	2024-12-06 17:19:10.628306	\N	\N	\N	2bb29a9a-280d-4096-af90-282282a41935	VNPAY	f	120000	\N
2024-12-06 17:19:47.696605	2024-12-06 17:19:47.696605	\N	\N	\N	ad1155c3-bdae-47eb-9134-cddfc445de0f	VNPAY	f	120000	\N
2024-12-06 17:27:44.122776	2024-12-06 17:27:44.122776	\N	\N	\N	49d6df6e-fab3-410f-be0a-d2cd6bcb9d05	VNPAY	f	120000	\N
2024-12-06 17:28:42.00356	2024-12-06 17:28:42.00356	\N	\N	\N	a8298d5e-7b3e-4858-bac6-1a5813ddbfb0	VNPAY	f	120000	\N
2024-12-06 17:49:10.083986	2024-12-06 17:49:10.083986	\N	\N	\N	560d8f4e-0920-4e7d-b3b8-63558c234679	VNPAY	f	120000	\N
2024-12-07 03:55:22.745299	2024-12-07 03:55:22.745299	\N	\N	\N	26f8da75-0739-4cef-9405-ef733084978a	VNPAY	f	120000	\N
2024-12-07 04:25:12.620195	2024-12-07 04:25:12.620195	\N	\N	\N	fad4d264-f6e5-48f7-add2-c2d5a670e007	VNPAY	f	120000	\N
2024-12-07 04:26:47.031441	2024-12-07 04:26:47.031441	\N	\N	\N	499d7099-167b-432e-9e13-b5a133abacd5	VNPAY	f	120000	\N
2024-12-07 04:53:30.46554	2024-12-07 04:53:30.46554	\N	\N	\N	0828ad89-56b5-4bde-b06e-1775724eac58	VNPAY	f	120000	\N
2024-12-07 04:54:52.041815	2024-12-07 04:54:52.041815	\N	\N	\N	d034dad3-f835-4247-8789-a4fe33b5491b	VNPAY	f	120000	\N
2024-12-07 05:06:20.984844	2024-12-07 05:06:20.984844	\N	\N	\N	a7140bca-6f42-43b0-afe7-f77aabffdbf6	VNPAY	f	120000	\N
2024-12-07 05:13:08.011292	2024-12-07 05:13:08.011292	\N	\N	\N	143d5a2f-9e24-4af0-aca7-f5d52820a1e8	VNPAY	f	120000	\N
2024-12-07 05:18:17.246237	2024-12-07 05:18:17.246237	\N	\N	\N	2d5329cd-93aa-45f2-9bee-4d481f3bb0fb	VNPAY	f	120000	\N
2024-12-07 05:20:00.418217	2024-12-07 05:20:00.418217	\N	\N	\N	7bf74427-70f6-494f-8b03-ad1154846476	VNPAY	f	120000	\N
2024-12-07 05:21:15.643381	2024-12-07 05:21:15.643381	\N	\N	\N	1e5f253d-f2aa-4b82-9dda-0feb39f19b66	VNPAY	f	120000	\N
2024-12-07 05:22:36.351334	2024-12-07 05:22:36.351334	\N	\N	\N	6d1da41a-b1ab-44ea-a6b3-b54a38977acb	VNPAY	f	120000	\N
2024-12-07 05:24:20.768365	2024-12-07 05:24:20.768365	\N	\N	\N	ca04caeb-a201-4cbe-8070-803359809660	VNPAY	f	120000	\N
2024-12-07 05:25:51.771426	2024-12-07 05:25:51.771426	\N	\N	\N	5f79222f-ceef-4499-bb96-6fa5ba337f40	VNPAY	f	120000	\N
2024-12-07 05:29:44.602278	2024-12-07 05:29:44.602278	\N	\N	\N	577d8b92-2d62-4a88-80bb-927748e021e9	VNPAY	f	120000	\N
2024-12-07 05:31:26.819035	2024-12-07 05:31:26.819035	\N	\N	\N	b9b95233-c4f8-4614-a03e-2bb662bc56cf	VNPAY	f	120000	\N
2024-12-11 09:05:03.099711	2024-12-11 09:21:10.612882	\N	\N	\N	baf8ce46-d405-4544-aa82-d2818b0d136c	VNPAY	t	120000	{"bankCode": "NCB", "cardType": "ATM", "orderInfo": "Thanh toan cho ma GD:94a7a9d5-541d-4eb2-acf4-9ae1ab010949", "paycheckInfo": {"vnp_PayDate": "20241211162053", "vnp_TmnCode": "X6DNOALK", "vnp_BankTranNo": "VNP14736642", "vnp_ResponseCode": "00", "vnp_TransactionNo": "14736642", "vnp_TransactionStatus": "00"}}
2024-12-12 06:19:28.227986	2024-12-12 06:19:28.227986	\N	\N	\N	a0fd588b-eca5-4635-93e0-b0bc5489cf34	VNPAY	f	120000	\N
2024-12-12 06:25:10.296665	2024-12-12 06:25:10.296665	\N	\N	\N	9c5eaadc-87fa-43c8-8541-d44574711499	VNPAY	f	120000	\N
2024-12-12 06:27:03.592468	2024-12-12 06:27:03.592468	\N	\N	\N	c2250316-eb78-4b67-8fe8-881a28564aaf	VNPAY	f	120000	\N
2024-12-12 06:29:19.088449	2024-12-12 06:29:19.088449	\N	\N	\N	567e5d25-b80a-471d-ab9e-42c1daa4073e	VNPAY	f	120000	\N
2024-12-12 06:33:49.569397	2024-12-12 06:33:49.569397	\N	\N	\N	1cb09359-6cf1-4514-ac8e-3ef384c4667e	VNPAY	f	120000	\N
2024-12-12 06:34:29.650501	2024-12-12 06:34:29.650501	\N	\N	\N	da3dabb9-3e88-4020-b1a2-07db16fb3e80	VNPAY	f	120000	\N
2024-12-12 06:35:17.946457	2024-12-12 06:35:17.946457	\N	\N	\N	ebcb43f9-3260-4fae-84b2-2fcd8d246e21	VNPAY	f	120000	\N
2024-12-12 06:36:57.561504	2024-12-12 06:36:57.561504	\N	\N	\N	9d6b0815-05bb-4b29-ba9b-4ecee878d664	VNPAY	f	120000	\N
2024-12-12 06:39:23.125563	2024-12-12 06:39:23.125563	\N	\N	\N	fdef3f90-99fa-445a-9286-d037508bb287	VNPAY	f	120000	\N
2024-12-12 06:45:53.946337	2024-12-12 06:45:53.946337	\N	\N	\N	1a79a2fe-9246-4007-a31c-3afe292f20d7	VNPAY	f	120000	\N
2024-12-12 06:52:51.246754	2024-12-12 06:52:51.246754	\N	\N	\N	00a6f8e8-087e-43f4-b5c9-550aa27f62f4	VNPAY	f	120000	\N
2024-12-12 07:08:54.051643	2024-12-12 07:08:54.051643	\N	\N	\N	3b47cc0f-cc98-470c-a299-2fbc8e7e417e	VNPAY	f	120000	\N
2024-12-12 07:10:27.103923	2024-12-12 07:10:27.103923	\N	\N	\N	caa99fc6-84a3-4876-a5a4-95b7456a5f5a	VNPAY	f	120000	\N
2024-12-12 07:11:17.883161	2024-12-12 07:11:17.883161	\N	\N	\N	ef05ef6e-d975-4c49-a9fa-cc67e2e41f74	VNPAY	f	120000	\N
2024-12-12 07:11:45.64711	2024-12-12 07:11:45.64711	\N	\N	\N	8fa06c6f-a926-49c7-8fdf-8f1911c89781	VNPAY	f	120000	\N
2024-12-12 07:12:18.990999	2024-12-12 07:12:18.990999	\N	\N	\N	bd98df09-6e27-4c01-ad93-30c53ae1ef66	VNPAY	f	120000	\N
2024-12-12 07:13:48.881639	2024-12-12 07:13:48.881639	\N	\N	\N	6b8e6861-e687-4491-97d2-f7bb9ac6bc23	VNPAY	f	120000	\N
2024-12-12 07:15:53.445146	2024-12-12 07:15:53.445146	\N	\N	\N	44d4bd7a-c7b1-41f9-923e-fc4864114983	VNPAY	f	120000	\N
2024-12-12 07:24:14.484831	2024-12-12 07:24:14.484831	\N	\N	\N	f1bdc0e7-de5f-4a18-9ff9-7a9113d1f6fb	VNPAY	f	120000	\N
2024-12-12 07:31:34.791769	2024-12-12 07:31:34.791769	\N	\N	\N	a3205a23-c882-4e0b-b36e-b3b46db67a99	VNPAY	f	120000	\N
2024-12-12 07:32:41.932256	2024-12-12 07:32:41.932256	\N	\N	\N	a5257984-64b1-42d6-8d8b-5105b2288507	VNPAY	f	120000	\N
2024-12-12 07:33:18.596236	2024-12-12 07:33:18.596236	\N	\N	\N	fc503211-db57-4e9b-8c08-fb3033c9e21f	VNPAY	f	120000	\N
2024-12-12 07:36:13.385561	2024-12-12 07:36:13.385561	\N	\N	\N	0abcdd48-18fe-4c0d-a6b5-2ab5df7a3715	VNPAY	f	120000	\N
2024-12-12 07:38:00.743513	2024-12-12 07:38:00.743513	\N	\N	\N	03c69bab-070f-4749-8f28-38f4112c777d	VNPAY	f	120000	\N
2024-12-12 07:48:49.72939	2024-12-12 07:48:49.72939	\N	\N	\N	f4852f9e-688d-4776-9860-14d8ad8b72aa	VNPAY	f	120000	\N
2024-12-12 07:49:36.686291	2024-12-12 07:49:36.686291	\N	\N	\N	639a4055-4f3f-4156-a8c0-5b9f0d192584	VNPAY	f	120000	\N
2024-12-12 07:53:56.933789	2024-12-12 07:53:56.933789	\N	\N	\N	f3566ccf-79d6-44e2-a481-4f38667a6f27	VNPAY	f	120000	\N
2024-12-12 07:55:09.684921	2024-12-12 07:55:09.684921	\N	\N	\N	fdbe04d6-764d-4032-ba08-ba30e608955f	VNPAY	f	120000	\N
2024-12-12 07:56:06.593827	2024-12-12 07:56:06.593827	\N	\N	\N	4623f811-b32b-4360-b0d0-2d34a3873dbb	VNPAY	f	120000	\N
2024-12-12 07:56:58.78323	2024-12-12 07:56:58.78323	\N	\N	\N	8286d728-67d5-4a72-b1a6-af6a71673214	VNPAY	f	120000	\N
2024-12-12 07:58:25.638796	2024-12-12 07:58:25.638796	\N	\N	\N	cb90fdc5-2247-40fc-96d3-0bdb6c47df5d	VNPAY	f	120000	\N
2024-12-12 07:59:52.139355	2024-12-12 08:00:35.676399	\N	\N	\N	812586a4-0300-43ce-ac27-ff4adff9dc25	VNPAY	t	120000	{"bankCode": "VNPAY", "cardType": "QRCODE", "orderInfo": "Thanh toan cho ma GD:889b6aa7-da41-42f4-b491-4eeea0bd1f15", "paycheckInfo": {"vnp_PayDate": "20241212145948", "vnp_TmnCode": "X6DNOALK", "vnp_ResponseCode": "24", "vnp_TransactionNo": "0", "vnp_TransactionStatus": "02"}}
2024-12-12 08:01:33.786572	2024-12-12 08:02:23.67294	\N	\N	\N	07f2cb6d-c27e-4bca-9f51-e12f6ef61dd3	VNPAY	t	120000	{"bankCode": "NCB", "cardType": "ATM", "orderInfo": "Thanh toan cho ma GD:23a892ff-1a93-4ffe-8fd3-8ce7ebae5bda", "paycheckInfo": {"vnp_PayDate": "20241212150204", "vnp_TmnCode": "X6DNOALK", "vnp_BankTranNo": "VNP14739073", "vnp_ResponseCode": "00", "vnp_TransactionNo": "14739073", "vnp_TransactionStatus": "00"}}
2024-12-12 08:05:23.622518	2024-12-12 08:05:23.622518	\N	\N	\N	efc53dc9-0fbb-48aa-987b-2c1890d6aa4b	VNPAY	f	120000	\N
2024-12-12 08:06:13.490656	2024-12-12 08:06:51.905875	\N	\N	\N	c6cdbc19-0837-453b-9875-435914f4fd33	VNPAY	t	120000	{"bankCode": "NCB", "cardType": "ATM", "orderInfo": "Thanh toan cho ma GD:250cf3f0-a0ed-488f-ab21-c526d841d23a", "paycheckInfo": {"vnp_PayDate": "20241212150635", "vnp_TmnCode": "X6DNOALK", "vnp_BankTranNo": "VNP14739095", "vnp_ResponseCode": "00", "vnp_TransactionNo": "14739095", "vnp_TransactionStatus": "00"}}
2024-12-12 08:18:33.068022	2024-12-12 08:19:14.595009	\N	\N	\N	ae0cf9ec-c14b-46d5-8795-aaf3f87b8973	VNPAY	t	120000	{"bankCode": "NCB", "cardType": "ATM", "orderInfo": "Thanh toan cho ma GD:b73ebebb-45d8-4613-b48b-90b3b56b12b6", "paycheckInfo": {"vnp_PayDate": "20241212151856", "vnp_TmnCode": "X6DNOALK", "vnp_BankTranNo": "VNP14739124", "vnp_ResponseCode": "00", "vnp_TransactionNo": "14739124", "vnp_TransactionStatus": "00"}}
2024-12-12 08:21:49.586221	2024-12-12 08:21:49.586221	\N	\N	\N	29d3afe8-fb64-47c9-9fc1-be92c283da5e	VNPAY	f	120000	\N
2024-12-12 08:22:35.714746	2024-12-12 08:22:35.714746	\N	\N	\N	e24b54a8-d7f8-4859-8564-c8869b861296	VNPAY	f	120000	\N
2024-12-12 08:24:00.229358	2024-12-12 08:24:00.229358	\N	\N	\N	e45f0a7b-01af-41a7-bd43-7daaef44ea9b	VNPAY	f	120000	\N
2024-12-12 08:26:54.90974	2024-12-12 08:26:54.90974	\N	\N	\N	3ca20345-ff39-4768-8c1c-d5e99d44d2cd	VNPAY	f	120000	\N
2024-12-12 08:28:26.80303	2024-12-12 08:28:26.80303	\N	\N	\N	5ea02eb0-aa63-4633-bc85-5c70a59decde	VNPAY	f	120000	\N
2024-12-12 08:29:06.719295	2024-12-12 08:29:06.719295	\N	\N	\N	591b6102-538a-43e9-becb-63a9bd64841f	VNPAY	f	120000	\N
2024-12-12 08:30:20.216207	2024-12-12 08:30:20.216207	\N	\N	\N	d4d06359-d12c-4502-9297-b296878e62a0	VNPAY	f	120000	\N
2024-12-12 08:31:03.57012	2024-12-12 08:31:03.57012	\N	\N	\N	3dbb358d-8c8b-46d4-a789-d546a177b751	VNPAY	f	120000	\N
2024-12-12 08:31:55.731878	2024-12-12 08:31:55.731878	\N	\N	\N	056c2cfc-a135-4270-bfdd-9105b7e3daff	VNPAY	f	120000	\N
2024-12-12 08:33:30.551116	2024-12-12 08:33:30.551116	\N	\N	\N	ce0597ef-3a49-4141-bc5f-a81ec4fceca2	VNPAY	f	120000	\N
2024-12-12 08:35:40.897327	2024-12-12 08:35:40.897327	\N	\N	\N	2d23f22f-99a6-4ab5-94c0-0a6713725a09	VNPAY	f	120000	\N
2024-12-12 08:35:46.294913	2024-12-12 08:35:46.294913	\N	\N	\N	64524d84-6d7a-4841-96c9-05adcca0c92e	VNPAY	f	120000	\N
2024-12-12 08:36:47.727168	2024-12-12 08:36:47.727168	\N	\N	\N	9542d8f7-34e5-4a62-b26e-b33cca5b53a3	VNPAY	f	120000	\N
2024-12-12 08:37:35.996165	2024-12-12 08:37:35.996165	\N	\N	\N	05ed17fc-1664-4b0e-877c-e3b3a13f62d5	VNPAY	f	120000	\N
2024-12-12 08:38:03.944425	2024-12-12 08:38:03.944425	\N	\N	\N	f7ae23b7-cdb4-4075-9f12-aec452fd234a	VNPAY	f	120000	\N
2024-12-12 08:39:08.509729	2024-12-12 08:39:08.509729	\N	\N	\N	b59d6538-2612-40d8-a178-36560e59ffeb	VNPAY	f	120000	\N
2024-12-12 08:39:29.345212	2024-12-12 08:39:29.345212	\N	\N	\N	519d6a9a-36b0-4d06-aa4f-093fc5fef8e2	VNPAY	f	120000	\N
2024-12-12 08:40:59.006393	2024-12-12 08:40:59.006393	\N	\N	\N	7054d748-8fd7-4f19-816b-3953903b7459	VNPAY	f	120000	\N
2024-12-12 08:43:41.153766	2024-12-12 08:44:08.403124	\N	\N	\N	444aa2c1-1be8-4c48-a630-9b48159d1e67	VNPAY	t	120000	{"bankCode": "NCB", "cardType": "ATM", "orderInfo": "Thanh toan cho ma GD:e3f423b6-878d-4a3d-81ce-c6a519d54697", "paycheckInfo": {"vnp_PayDate": "20241212154352", "vnp_TmnCode": "X6DNOALK", "vnp_BankTranNo": "VNP14739210", "vnp_ResponseCode": "00", "vnp_TransactionNo": "14739210", "vnp_TransactionStatus": "00"}}
2024-12-12 09:07:30.958157	2024-12-12 09:07:30.958157	\N	\N	\N	4ab9c4de-afaf-4f49-9246-71d6e5d11fad	VNPAY	f	120000	\N
2024-12-12 09:09:07.72288	2024-12-12 09:09:07.72288	\N	\N	\N	ffb9865c-5ad9-432c-8154-44a9b3752361	VNPAY	f	120000	\N
2024-12-12 09:09:22.221608	2024-12-12 09:09:22.221608	\N	\N	\N	58727387-2839-42fc-976f-53fba9d3033e	VNPAY	f	120000	\N
2024-12-12 09:10:03.841845	2024-12-12 09:10:03.841845	\N	\N	\N	459fa60a-4f6b-4989-b1a4-ebaa001bf883	VNPAY	f	120000	\N
2024-12-12 09:11:38.025476	2024-12-12 09:11:38.025476	\N	\N	\N	b1df97e4-7583-41fe-94fe-0b9cd3dfbf51	VNPAY	f	120000	\N
2024-12-12 09:19:03.452492	2024-12-12 09:19:03.452492	\N	\N	\N	4d247660-9025-4711-8393-f99cec52593e	VNPAY	f	120000	\N
2024-12-12 09:21:29.879862	2024-12-12 09:21:29.879862	\N	\N	\N	5e223eb6-a5eb-41e3-b41d-e49c974d94c9	VNPAY	f	120000	\N
2024-12-12 09:32:32.45809	2024-12-12 09:33:21.049219	\N	\N	\N	04374b19-c018-4fbc-a5a8-b105103ebf3e	VNPAY	t	120000	{"bankCode": "NCB", "cardType": "ATM", "orderInfo": "Thanh toan cho ma GD:7bfd6290-8c5c-4ffa-bd79-d377e21341de", "paycheckInfo": {"vnp_PayDate": "20241212163304", "vnp_TmnCode": "X6DNOALK", "vnp_BankTranNo": "VNP14739362", "vnp_ResponseCode": "00", "vnp_TransactionNo": "14739362", "vnp_TransactionStatus": "00"}}
2024-12-12 10:09:54.138228	2024-12-12 10:09:54.138228	\N	\N	\N	32e854c9-c6dd-418b-bbfd-a9da57e80975	VNPAY	f	120000	\N
2024-12-12 10:11:46.087895	2024-12-12 10:11:46.087895	\N	\N	\N	350243d3-3dfb-4089-80f8-24431df53c4c	VNPAY	f	120000	\N
2024-12-12 10:18:53.672576	2024-12-12 10:18:53.672576	\N	\N	\N	3221730b-be7c-4047-91ab-a360c4d353f6	VNPAY	f	120000	\N
2024-12-12 10:19:29.796262	2024-12-12 10:19:29.796262	\N	\N	\N	b412b994-2921-4c9c-a264-7a868ddf942d	VNPAY	f	120000	\N
2024-12-12 10:32:52.214598	2024-12-12 10:32:52.214598	\N	\N	\N	69bef52f-9fd1-4537-878b-3dc2a09aab3f	VNPAY	f	120000	\N
2024-12-13 01:27:42.124185	2024-12-13 01:27:42.124185	\N	\N	\N	fe34882a-68cc-4417-882b-0031ff2a8b3b	VNPAY	f	120000	\N
2024-12-13 01:28:12.885882	2024-12-13 01:28:33.084073	\N	\N	\N	f9c8e2b3-35bb-469e-a3ea-da570f11545c	VNPAY	t	120000	{"bankCode": "VNPAY", "cardType": "QRCODE", "orderInfo": "Thanh toan cho ma GD:dca3fce8-baf0-46df-b313-12479507d844", "paycheckInfo": {"vnp_PayDate": "20241213082801", "vnp_TmnCode": "X6DNOALK", "vnp_ResponseCode": "24", "vnp_TransactionNo": "0", "vnp_TransactionStatus": "02"}}
2024-12-14 12:19:45.563846	2024-12-14 12:20:21.313326	\N	\N	\N	9a346bad-de31-4d9c-ae0c-64dbc48999e4	VNPAY	t	120000	{"bankCode": "NCB", "cardType": "ATM", "orderInfo": "Thanh toan cho ma GD:4b8e0df0-0400-48b2-b02c-cab197830025", "paycheckInfo": {"vnp_PayDate": "20241214192004", "vnp_TmnCode": "X6DNOALK", "vnp_BankTranNo": "VNP14744381", "vnp_ResponseCode": "00", "vnp_TransactionNo": "14744381", "vnp_TransactionStatus": "00"}}
2024-12-14 13:04:50.569875	2024-12-14 13:05:17.082638	\N	\N	\N	35fbdf79-ec2e-4dde-924f-b9c2df7f3421	VNPAY	t	120000	{"bankCode": "VNPAY", "cardType": "QRCODE", "orderInfo": "Thanh toan cho ma GD:e54427da-9975-4077-8fd9-ef7647c29562", "paycheckInfo": {"vnp_PayDate": "20241214200438", "vnp_TmnCode": "X6DNOALK", "vnp_ResponseCode": "24", "vnp_TransactionNo": "0", "vnp_TransactionStatus": "02"}}
2024-12-14 13:05:25.578445	2024-12-14 13:05:45.872973	\N	\N	\N	8efaa4f4-b902-45b6-b703-a610b34e2518	VNPAY	t	120000	{"bankCode": "VNPAY", "cardType": "QRCODE", "orderInfo": "Thanh toan cho ma GD:1c4e5490-7d6d-46f1-9e0e-54619e240ca3", "paycheckInfo": {"vnp_PayDate": "20241214200513", "vnp_TmnCode": "X6DNOALK", "vnp_ResponseCode": "24", "vnp_TransactionNo": "0", "vnp_TransactionStatus": "02"}}
2024-12-14 13:46:56.530486	2024-12-14 13:47:29.101965	\N	\N	\N	9161fc62-b7c7-4f9e-b1ca-af0d11a90f3b	VNPAY	t	1200000	{"bankCode": "NCB", "cardType": "ATM", "orderInfo": "Thanh toan cho ma GD:c0ee3853-345c-4bef-9de0-ff6120126b89", "paycheckInfo": {"vnp_PayDate": "20241214204710", "vnp_TmnCode": "X6DNOALK", "vnp_BankTranNo": "VNP14744534", "vnp_ResponseCode": "00", "vnp_TransactionNo": "14744534", "vnp_TransactionStatus": "00"}}
2024-12-14 17:22:04.953574	2024-12-14 17:22:04.953574	\N	\N	\N	10fed799-779f-4c22-a598-332000dfae09	VNPAY	f	0	\N
2024-12-16 08:14:43.945385	2024-12-16 08:14:43.945385	\N	\N	\N	cb85bbb2-efb7-4781-8efc-89bcfeab2095	VNPAY	f	120000	\N
2024-12-16 08:14:47.71838	2024-12-16 08:14:47.71838	\N	\N	\N	a76d9a91-1143-49bb-a506-068c83accb35	VNPAY	f	120000	\N
2024-12-16 08:14:54.479504	2024-12-16 08:14:54.479504	\N	\N	\N	72b8bd81-6e8e-4aa2-848b-ebafa349c6fa	VNPAY	f	120000	\N
2024-12-16 08:15:06.588914	2024-12-16 08:15:06.588914	\N	\N	\N	5900e95e-51b5-4e7e-9173-caf2cef714fa	VNPAY	f	120000	\N
2024-12-16 08:16:41.881423	2024-12-16 08:16:41.881423	\N	\N	\N	b0366d38-53c0-465e-9321-51e68e89b328	VNPAY	f	120000	\N
2024-12-16 08:17:12.057791	2024-12-16 08:17:12.057791	\N	\N	\N	8ef1982f-94e9-40eb-951d-ca168e50bfa4	VNPAY	f	120000	\N
2024-12-16 08:18:09.393082	2024-12-16 08:18:09.393082	\N	\N	\N	19e0bbae-cf96-4c82-8f63-5f3a27294ac3	VNPAY	f	120000	\N
2024-12-16 08:18:24.71275	2024-12-16 08:18:24.71275	\N	\N	\N	cb03eeb8-9af6-42e5-844a-2ef52ebab119	VNPAY	f	0	\N
2024-12-16 08:18:34.987573	2024-12-16 08:18:34.987573	\N	\N	\N	78e8c39b-c7f0-413b-8572-7a8531fb326b	VNPAY	f	120000	\N
2024-12-16 08:20:00.045612	2024-12-16 08:20:00.045612	\N	\N	\N	218ebcf1-28dc-4bc6-9838-d23f3f0691e2	VNPAY	f	120000	\N
2024-12-16 08:21:24.928399	2024-12-16 08:21:24.928399	\N	\N	\N	57869699-0563-49af-abdd-cc956011c9f6	VNPAY	f	120000	\N
2024-12-16 08:22:48.746554	2024-12-16 08:22:48.746554	\N	\N	\N	82abe199-d62f-4a79-964d-4f7cd0ed2e77	VNPAY	f	120000	\N
2024-12-16 08:22:52.188526	2024-12-16 08:22:52.188526	\N	\N	\N	90709c99-dd8c-4635-a0ae-2c677fd1eb9d	VNPAY	f	120000	\N
2024-12-16 08:23:44.40404	2024-12-16 08:23:44.40404	\N	\N	\N	7a4078d2-6d8e-4a2d-9ca3-9fb27eee0e7e	VNPAY	f	120000	\N
2024-12-16 08:24:22.783773	2024-12-16 08:24:22.783773	\N	\N	\N	ad3b327a-5b42-4fc1-8583-4a46faf7ad3a	VNPAY	f	120000	\N
2024-12-16 08:31:42.3628	2024-12-16 08:31:42.3628	\N	\N	\N	b2795840-12f8-46f6-bc90-61bac35ddc0c	VNPAY	f	120000	\N
2024-12-16 08:42:12.492103	2024-12-16 08:42:12.492103	\N	\N	\N	df457962-1338-4cb5-a4db-d1ae9d679d4b	VNPAY	f	120000	\N
2024-12-16 08:45:18.639455	2024-12-16 08:45:18.639455	\N	\N	\N	da609133-4850-4884-b5d7-715039782b22	VNPAY	f	120000	\N
2024-12-16 08:48:09.684041	2024-12-16 08:48:09.684041	\N	\N	\N	84439036-b071-4625-b309-efe6ac067b65	VNPAY	f	120000	\N
2024-12-16 08:48:12.681495	2024-12-16 08:48:12.681495	\N	\N	\N	a62c45c3-896d-47f3-9579-41e87c56e41b	VNPAY	f	120000	\N
2024-12-16 09:06:24.445649	2024-12-16 09:06:24.445649	\N	\N	\N	cc4c4b2c-2b2c-4d46-9c82-a34eab67eb01	VNPAY	f	120000	\N
2024-12-16 09:09:50.971277	2024-12-16 09:09:50.971277	\N	\N	\N	db3f5997-8415-4c8c-9c52-8cad101dd6df	VNPAY	f	120000	\N
2024-12-16 09:11:51.941081	2024-12-16 09:11:51.941081	\N	\N	\N	1a34cdda-1d53-4fed-a3f9-2e66d0304d1f	VNPAY	f	120000	\N
2024-12-16 09:12:05.881624	2024-12-16 09:12:05.881624	\N	\N	\N	9a27a9fc-80db-4832-89c6-45a546eb28c3	VNPAY	f	120000	\N
2024-12-16 09:12:24.580222	2024-12-16 09:12:24.580222	\N	\N	\N	9cdbe503-2e3f-427f-94ec-b474f51052b2	VNPAY	f	120000	\N
2024-12-16 09:16:34.186197	2024-12-16 09:16:34.186197	\N	\N	\N	4e3a4f78-be80-45d9-b005-4c5cf37cb504	VNPAY	f	0	\N
2024-12-16 09:20:29.964132	2024-12-16 09:21:54.544211	\N	\N	\N	d0d072fd-5e6f-4ae7-b300-02dd3635471d	VNPAY	t	100000	{"bankCode": "NCB", "cardType": "ATM", "orderInfo": "Thanh toan cho ma GD:fb47c1ce-9f81-4f63-a04e-7deebc9038bd", "paycheckInfo": {"vnp_PayDate": "20241216162136", "vnp_TmnCode": "X6DNOALK", "vnp_BankTranNo": "VNP14748637", "vnp_ResponseCode": "00", "vnp_TransactionNo": "14748637", "vnp_TransactionStatus": "00"}}
2024-12-16 09:23:14.657363	2024-12-16 09:23:55.082599	\N	\N	\N	1ab09603-8806-4fe5-b9a1-9aa5e32f0018	VNPAY	t	100000	{"bankCode": "NCB", "cardType": "ATM", "orderInfo": "Thanh toan cho ma GD:eb151481-075b-40b3-a23c-ec53eff6a37f", "paycheckInfo": {"vnp_PayDate": "20241216162336", "vnp_TmnCode": "X6DNOALK", "vnp_BankTranNo": "VNP14748643", "vnp_ResponseCode": "00", "vnp_TransactionNo": "14748643", "vnp_TransactionStatus": "00"}}
2024-12-16 09:58:41.108404	2024-12-16 09:58:41.108404	\N	\N	\N	e252a27b-bcb2-47aa-81e9-2820bd7cb08f	VNPAY	f	120000	\N
2024-12-16 10:51:30.874329	2024-12-16 10:51:30.874329	\N	\N	\N	c6deb1d6-8ae1-494a-a375-2f0d0c33572d	VNPAY	f	120000	\N
2024-12-16 10:53:26.525941	2024-12-16 10:54:13.009419	\N	\N	\N	3aa5cc17-4894-41ad-9928-51cf85bce575	VNPAY	t	120000	{"bankCode": "NCB", "cardType": "ATM", "orderInfo": "Thanh toan cho ma GD:63ed9a6f-1895-48f0-92b8-7ad6314c5a6b", "paycheckInfo": {"vnp_PayDate": "20241216175352", "vnp_TmnCode": "X6DNOALK", "vnp_BankTranNo": "VNP14748879", "vnp_ResponseCode": "00", "vnp_TransactionNo": "14748879", "vnp_TransactionStatus": "00"}}
2024-12-16 10:56:29.017427	2024-12-16 10:57:02.064908	\N	\N	\N	96c12ecd-e3bc-4582-ba38-d191ddbada06	VNPAY	t	120000	{"bankCode": "NCB", "cardType": "ATM", "orderInfo": "Thanh toan cho ma GD:6bfdefd3-49a7-45e0-a375-08fa1fe4753d", "paycheckInfo": {"vnp_PayDate": "20241216175636", "vnp_TmnCode": "X6DNOALK", "vnp_ResponseCode": "24", "vnp_TransactionNo": "14748889", "vnp_TransactionStatus": "02"}}
2024-12-16 11:33:06.973403	2024-12-16 11:33:35.422545	\N	\N	\N	2c1c8466-5e3e-4828-89d3-a7fdaefc7c9b	VNPAY	t	120000	{"bankCode": "VNPAY", "cardType": "QRCODE", "orderInfo": "Thanh toan cho ma GD:fd337f84-5a2c-40bd-9862-0f95ea71a69c", "paycheckInfo": {"vnp_PayDate": "20241216183254", "vnp_TmnCode": "X6DNOALK", "vnp_ResponseCode": "24", "vnp_TransactionNo": "0", "vnp_TransactionStatus": "02"}}
2024-12-16 11:34:27.862074	2024-12-16 11:34:27.862074	\N	\N	\N	2aea12b3-7650-46d3-ad67-caf02137a05e	VNPAY	f	120000	\N
2024-12-16 11:37:23.786736	2024-12-16 11:37:23.786736	\N	\N	\N	1eec9f71-4bf3-4692-afb2-42df98777e61	VNPAY	f	120000	\N
2024-12-16 11:44:20.762881	2024-12-16 11:44:20.762881	\N	\N	\N	cb0f9944-adf8-444f-9ef3-acf0c4a7ca92	VNPAY	f	120000	\N
2024-12-16 11:45:24.531264	2024-12-16 11:45:24.531264	\N	\N	\N	68990464-7a84-43c5-af72-ee0a97d8d48d	VNPAY	f	120000	\N
2024-12-16 11:46:02.517439	2024-12-16 11:46:02.517439	\N	\N	\N	2a4fb836-c2a6-4d2b-9dd3-8b9b6522b525	VNPAY	f	120000	\N
2024-12-16 14:08:09.359079	2024-12-16 14:08:09.359079	\N	\N	\N	dbcfa293-f49c-42e8-8c0c-d2aea4a7acde	VNPAY	f	100000	\N
2024-12-16 14:50:29.090032	2024-12-16 14:52:04.263006	\N	\N	\N	e2bcfdcd-caa6-45a3-9ae7-71b73025524f	VNPAY	t	100000	{"bankCode": "NCB", "cardType": "ATM", "orderInfo": "Thanh toan cho ma GD:ada37d79-6d7e-4359-8a97-0cc9640d2955", "paycheckInfo": {"vnp_PayDate": "20241216215142", "vnp_TmnCode": "X6DNOALK", "vnp_BankTranNo": "VNP14749368", "vnp_ResponseCode": "00", "vnp_TransactionNo": "14749368", "vnp_TransactionStatus": "00"}}
2024-12-16 14:58:08.420405	2024-12-16 14:58:08.420405	\N	\N	\N	0e983658-5982-490a-81e8-79d18ef1a7e7	VNPAY	f	120000	\N
2024-12-16 16:57:02.023212	2024-12-16 16:57:02.023212	\N	\N	\N	1b689b17-85fe-46d3-91a7-ba456d292c9a	VNPAY	f	100000	\N
2024-12-17 08:05:04.190897	2024-12-17 08:05:04.190897	\N	\N	\N	68aa3212-4154-405e-8f25-7ec5bb8c0861	VNPAY	f	100000	\N
2024-12-17 09:50:07.840418	2024-12-17 09:50:07.840418	\N	\N	\N	f667cced-dd16-4443-9e6e-ecb41aff8266	VNPAY	f	120000	\N
2024-12-17 10:05:08.934236	2024-12-17 10:05:08.934236	\N	\N	\N	877af470-a1ae-4a91-b8c9-5c3a6c5dfc9f	VNPAY	f	100000	\N
2024-12-17 10:38:38.30017	2024-12-17 10:38:38.30017	\N	\N	\N	f45dd244-9004-4e0f-a642-b1918e081bb6	VNPAY	f	220000	\N
2024-12-17 10:45:38.793455	2024-12-17 10:46:07.887582	\N	\N	\N	704dbef4-8fb2-4ea1-a19b-d71fd7242682	VNPAY	t	220000	{"bankCode": "NCB", "cardType": "ATM", "orderInfo": "Thanh toan cho ma GD:8df01930-3a42-42b1-b923-5559cd3bed50", "paycheckInfo": {"vnp_PayDate": "20241217174548", "vnp_TmnCode": "X6DNOALK", "vnp_BankTranNo": "VNP14751998", "vnp_ResponseCode": "00", "vnp_TransactionNo": "14751998", "vnp_TransactionStatus": "00"}}
2024-12-17 10:46:49.816715	2024-12-17 10:46:49.816715	\N	\N	\N	4875f0b1-9f3d-4f30-b945-284b42900662	VNPAY	f	220000	\N
2024-12-17 11:05:13.995184	2024-12-17 11:05:27.888022	\N	\N	\N	ff73aab0-07b2-485c-b08a-1744c71e5e5c	VNPAY	t	220000	{"bankCode": "VNPAY", "cardType": "QRCODE", "orderInfo": "Thanh toan cho ma GD:758a77c2-9957-45e1-9ce5-b5371a6ed84c", "paycheckInfo": {"vnp_PayDate": "20241217180500", "vnp_TmnCode": "X6DNOALK", "vnp_ResponseCode": "24", "vnp_TransactionNo": "0", "vnp_TransactionStatus": "02"}}
2024-12-17 11:06:29.94179	2024-12-17 11:06:41.6307	\N	\N	\N	b19cef11-f094-4fcd-8eee-8139c19b20f1	VNPAY	t	120000	{"bankCode": "VNPAY", "cardType": "QRCODE", "orderInfo": "Thanh toan cho ma GD:d06f21bc-102a-457f-ace3-529ad7dd8385", "paycheckInfo": {"vnp_PayDate": "20241217180616", "vnp_TmnCode": "X6DNOALK", "vnp_ResponseCode": "24", "vnp_TransactionNo": "0", "vnp_TransactionStatus": "02"}}
2024-12-17 11:07:50.725638	2024-12-17 11:07:50.725638	\N	\N	\N	e0f163da-c69d-4135-9f18-ab1c64e86eac	VNPAY	f	120000	\N
2024-12-17 12:06:30.640858	2024-12-17 12:06:30.640858	\N	\N	\N	72cd90db-f133-4ea1-b835-01c140ac6b97	VNPAY	f	100000	\N
2024-12-17 12:06:45.618455	2024-12-17 12:06:45.618455	\N	\N	\N	a05ca65d-8172-46bb-9848-936293657f0e	VNPAY	f	100000	\N
2024-12-17 12:06:59.91677	2024-12-17 12:06:59.91677	\N	\N	\N	a7fea5b3-a7d4-43a9-8854-f51668c39a8a	VNPAY	f	100000	\N
2024-12-17 12:08:46.095142	2024-12-17 12:08:46.095142	\N	\N	\N	5fe4fac4-888c-4eca-907a-2a63f1fce7fb	VNPAY	f	100000	\N
2024-12-17 12:10:36.433161	2024-12-17 12:10:36.433161	\N	\N	\N	8b00818d-4fa9-421c-bb15-3f61db1cc5c1	VNPAY	f	100000	\N
2024-12-17 12:11:19.488028	2024-12-17 12:11:19.488028	\N	\N	\N	ae3f52e2-812b-4cc4-89cb-75387b554d67	VNPAY	f	100000	\N
2024-12-17 12:11:37.409449	2024-12-17 12:11:37.409449	\N	\N	\N	180b1066-4fe3-4c2d-b4ac-e6d539b4a02c	VNPAY	f	100000	\N
2024-12-17 12:12:03.765767	2024-12-17 12:12:03.765767	\N	\N	\N	0012dd4d-e92f-46c5-b4a4-8f30b04d0612	VNPAY	f	100000	\N
2024-12-17 13:00:49.219768	2024-12-17 13:00:49.219768	\N	\N	\N	e97099ee-cf69-4bee-ae07-8ab22af33f51	VNPAY	f	120000	\N
2024-12-17 13:05:43.99993	2024-12-17 13:05:43.99993	\N	\N	\N	3959d0dd-912d-4017-b470-fcc7dfddc5f9	VNPAY	f	100000	\N
2024-12-17 13:06:39.189474	2024-12-17 13:06:39.189474	\N	\N	\N	912cf0fd-4526-41ca-a1a4-04078106b875	VNPAY	f	120000	\N
2024-12-17 13:07:55.147317	2024-12-17 13:07:55.147317	\N	\N	\N	00f51263-e4ca-42e9-b8c6-54d9d696579d	VNPAY	f	120000	\N
2024-12-17 13:09:36.784526	2024-12-17 13:09:36.784526	\N	\N	\N	77bc151a-49ae-499a-a11d-157f641f2072	VNPAY	f	0	\N
2024-12-17 13:09:41.967961	2024-12-17 13:09:41.967961	\N	\N	\N	fcbd2240-d30c-41d7-ae70-26f83b496ff3	VNPAY	f	120000	\N
2024-12-17 13:10:11.258226	2024-12-17 13:10:11.258226	\N	\N	\N	8f1341b2-b490-4d17-9643-1d054cde893e	VNPAY	f	120000	\N
2024-12-17 13:10:47.033195	2024-12-17 13:10:47.033195	\N	\N	\N	458c4696-f4e0-4931-adc5-653c06f7eb3b	VNPAY	f	120000	\N
2024-12-17 13:11:42.017323	2024-12-17 13:11:42.017323	\N	\N	\N	28489e7d-0640-40a9-b6ba-e0012352f3e0	VNPAY	f	0	\N
2024-12-17 13:14:35.269771	2024-12-17 13:14:35.269771	\N	\N	\N	b2ab56d2-8575-4ba4-9fe5-53b3e72a8598	VNPAY	f	120000	\N
2024-12-17 13:18:04.706387	2024-12-17 13:18:04.706387	\N	\N	\N	6fe0a33b-dd91-41aa-a748-8864546322d3	VNPAY	f	0	\N
2024-12-17 13:18:06.191519	2024-12-17 13:18:06.191519	\N	\N	\N	3bba67c4-11bf-420d-bf00-1fdeeb7cf697	VNPAY	f	0	\N
2024-12-17 13:18:07.395053	2024-12-17 13:18:07.395053	\N	\N	\N	2333c7a2-c717-4f92-b5e8-3de0f3653c92	VNPAY	f	0	\N
2024-12-17 13:18:08.493409	2024-12-17 13:18:08.493409	\N	\N	\N	4f28fe94-e8aa-45f6-ad8f-50fbaa021d3c	VNPAY	f	0	\N
2024-12-17 13:18:09.468914	2024-12-17 13:18:09.468914	\N	\N	\N	0af85ad3-4177-4cd3-bfec-93557cef77ea	VNPAY	f	0	\N
2024-12-17 13:19:01.623941	2024-12-17 13:19:01.623941	\N	\N	\N	89a6d501-7a7c-4299-8a64-3cea06c1951c	VNPAY	f	100000	\N
2024-12-17 13:19:53.371299	2024-12-17 13:19:53.371299	\N	\N	\N	89334185-38bb-4a83-a896-bb85a6ee8eba	VNPAY	f	100000	\N
2024-12-17 13:21:27.927238	2024-12-17 13:21:27.927238	\N	\N	\N	bc12ff24-fac6-4ede-86a8-d8742a57a7f9	VNPAY	f	120000	\N
2024-12-17 13:21:33.527648	2024-12-17 13:21:33.527648	\N	\N	\N	5e8106db-a152-4ed4-8ec4-512c769c5035	VNPAY	f	120000	\N
2024-12-17 13:21:34.743889	2024-12-17 13:21:34.743889	\N	\N	\N	94fbc6f6-59e2-4cb9-bdee-33bfa7050092	VNPAY	f	120000	\N
2024-12-17 13:21:35.67615	2024-12-17 13:21:35.67615	\N	\N	\N	15017667-37b3-4b1f-af1f-716344d5fe67	VNPAY	f	120000	\N
2024-12-17 13:21:36.637039	2024-12-17 13:21:36.637039	\N	\N	\N	41458385-dbd6-4880-908f-03df59cea11a	VNPAY	f	120000	\N
2024-12-17 13:22:08.180143	2024-12-17 13:22:08.180143	\N	\N	\N	2f208888-8427-4113-8da7-703312e9e3cd	VNPAY	f	120000	\N
2024-12-17 13:22:38.921394	2024-12-17 13:22:38.921394	\N	\N	\N	2f0e7fbb-0216-474c-b091-f86906e5c49d	VNPAY	f	120000	\N
2024-12-17 13:24:26.880988	2024-12-17 13:25:52.434185	\N	\N	\N	5a083cef-c342-48c7-832c-3c9f3bb8a3cc	VNPAY	t	100000	{"bankCode": "NCB", "cardType": "ATM", "orderInfo": "Thanh toan cho ma GD:5dd2336e-5ecd-468a-86c7-a9c71370725c", "paycheckInfo": {"vnp_PayDate": "20241217202531", "vnp_TmnCode": "X6DNOALK", "vnp_BankTranNo": "VNP14752297", "vnp_ResponseCode": "00", "vnp_TransactionNo": "14752297", "vnp_TransactionStatus": "00"}}
2024-12-17 13:26:56.430494	2024-12-17 13:26:56.430494	\N	\N	\N	df0b0957-927d-4196-b25c-d79eb8f2581a	VNPAY	f	0	\N
2024-12-17 13:28:40.344026	2024-12-17 13:28:40.344026	\N	\N	\N	da62f54a-f1f3-45a9-a79d-d603be065250	VNPAY	f	0	\N
2024-12-17 13:28:50.162101	2024-12-17 13:28:50.162101	\N	\N	\N	0c002256-363b-4f2d-a585-f48123598ab5	VNPAY	f	0	\N
2024-12-17 13:28:57.705949	2024-12-17 13:28:57.705949	\N	\N	\N	7a66caa8-e25d-4866-a075-65c4d110d2d9	VNPAY	f	0	\N
2024-12-17 13:29:09.279816	2024-12-17 13:29:09.279816	\N	\N	\N	9b4c207f-b368-4931-ac23-6290934e1855	VNPAY	f	0	\N
2024-12-17 13:30:35.970759	2024-12-17 13:30:35.970759	\N	\N	\N	3cb0a11b-f3c1-4f9f-b0f8-2d17e7fcbf9d	VNPAY	f	0	\N
2024-12-17 13:32:36.07448	2024-12-17 13:33:18.321945	\N	\N	\N	aa325a09-58e4-4187-9063-078a06ac7b75	VNPAY	t	100000	{"bankCode": "NCB", "cardType": "ATM", "orderInfo": "Thanh toan cho ma GD:e52f5993-f027-40ed-950d-0590e296ae32", "paycheckInfo": {"vnp_PayDate": "20241217203257", "vnp_TmnCode": "X6DNOALK", "vnp_BankTranNo": "VNP14752317", "vnp_ResponseCode": "00", "vnp_TransactionNo": "14752317", "vnp_TransactionStatus": "00"}}
2024-12-17 13:34:29.7004	2024-12-17 13:35:18.09529	\N	\N	\N	2166fc64-a4d0-4862-9ef6-3cce049d60d8	VNPAY	t	120000	{"bankCode": "NCB", "cardType": "ATM", "orderInfo": "Thanh toan cho ma GD:f9b6dbc2-a7e4-4dd8-a440-48373571fef6", "paycheckInfo": {"vnp_PayDate": "20241217203457", "vnp_TmnCode": "X6DNOALK", "vnp_BankTranNo": "VNP14752322", "vnp_ResponseCode": "00", "vnp_TransactionNo": "14752322", "vnp_TransactionStatus": "00"}}
2024-12-18 16:52:45.591626	2024-12-18 16:52:45.591626	\N	\N	\N	b3ca1a0e-a5e1-4d44-aa9d-8738b407e2c7	VNPAY	f	0	\N
2024-12-18 17:12:05.433527	2024-12-18 17:12:05.433527	\N	\N	\N	df3c7f2a-1465-4c69-ad4b-fbd50f9cbba7	VNPAY	f	100000	\N
2024-12-18 17:12:06.114028	2024-12-18 17:13:26.289659	\N	\N	\N	043cbe8f-8305-416d-89b1-7e843e23fc9b	VNPAY	t	100000	{"bankCode": "NCB", "cardType": "ATM", "orderInfo": "Thanh toan cho ma GD:44d60be0-0b29-45c7-a868-1bbfab33b40e", "paycheckInfo": {"vnp_PayDate": "20241219001302", "vnp_TmnCode": "X6DNOALK", "vnp_BankTranNo": "VNP14756460", "vnp_ResponseCode": "00", "vnp_TransactionNo": "14756460", "vnp_TransactionStatus": "00"}}
2024-12-18 17:25:59.598933	2024-12-18 17:26:39.360313	\N	\N	\N	4e2f37c8-1f0b-4c11-a35e-05c72b463994	VNPAY	t	120000	{"bankCode": "NCB", "cardType": "ATM", "orderInfo": "Thanh toan cho ma GD:2ae512b3-2f9e-45b9-b8bf-3724cc29982c", "paycheckInfo": {"vnp_PayDate": "20241219002617", "vnp_TmnCode": "X6DNOALK", "vnp_BankTranNo": "VNP14756512", "vnp_ResponseCode": "00", "vnp_TransactionNo": "14756512", "vnp_TransactionStatus": "00"}}
\.


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.permissions (create_at, update_at, create_by, update_by, delete_at, name, description, id) FROM stdin;
2024-10-02 04:52:14.213362	2024-10-02 04:52:14.213362	\N	\N	\N	Quản lý khóa học	Cho phép thêm, xóa, sửa khoá học	MANAGE_COURSE
2024-10-02 04:52:27.742336	2024-10-02 04:52:27.742336	\N	\N	\N	Quản lý nhân viên	Cho phép thêm, xóa, sửa tài khoản nhân viên	MANAGE_EMPLOYEE
2024-10-02 04:52:27.884424	2024-10-02 04:52:27.884424	\N	\N	\N	Duyệt đăng ký giảng viên	Cho phép duyệt đăng ký giảng viên	APPROVE_LECTURER_REGISTER
2024-10-02 04:52:28.029	2024-10-02 04:52:28.029	\N	\N	\N	Duyệt khóa học	Cho phép duyệt các thay đổi hoặc thêm khóa học	APPROVE_COURSE
2024-10-02 04:52:28.163727	2024-10-02 04:52:28.163727	\N	\N	\N	Quản lý học viên	Cho phép thêm, xóa, sửa học viên	MANAGE_STUDENT
2024-10-02 08:38:31.197075	2024-10-02 08:38:31.197075	\N	\N	\N	Quản lý giảng viên	Cho phép quản lý giảng viên	MANAGE_LECTURER
\.


--
-- Data for Name: quizzes; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.quizzes (create_at, update_at, create_by, update_by, delete_at, id, content, choice_a, choice_b, choice_c, choice_d, "order", explanation, correct_choices, lesson_part_id) FROM stdin;
2024-10-27 09:36:12.893532	2024-10-27 09:36:12.893532	\N	\N	\N	d7c50ff6-ca53-40fd-bc5c-44542a04dae6	Pacakge manager của NodeJS là gì?	NPM	Maven	Dart package	NuGet	1	\N	\N	\N
2024-11-15 08:41:22.636917	2024-11-15 08:41:22.636917	\N	\N	\N	0f655838-a167-4d7e-978c-11da872d26f7	Tại sao trong khóa học này lại dùng Ubuntu bản 20.04 mà không phải bản mới hơn là 24.04 ?	Vì bản mới thiếu ổn định	Vì bản mới nhiều lỗi	Vì giảng viên thích thế	Vì bản 20.04 miễn phí còn bản 24.04 mất phí	2	\N	A,B	bd7ba758-23d9-471c-a534-9757946681cd
2024-11-15 09:10:45.067173	2024-11-15 09:10:45.067173	\N	\N	\N	042e14ac-8197-4b4c-934d-5fcc30ca3206	Tại sao trong khóa học này lại dùng Ubuntu bản 20.04 mà không phải bản mới hơn là 24.04 ?	Vì bản mới thiếu ổn định	Vì bản mới nhiều lỗi	Vì giảng viên thích thế	Vì bản 20.04 miễn phí còn bản 24.04 mất phí	2	\N	A,B	5b1a2c8f-68ef-4539-91ab-7240b5fb1ad1
2024-11-24 06:58:25.169901	2024-11-24 06:58:25.169	\N	\N	\N	69785661-40b9-407b-a015-5ab9d9a6b703	Docker là gì?	Ngôn ngữ lập trình	Docker là một nền tảng cho developers và sysadmin để develop, deploy và run application với container	\N	\N	1	\N	B	e456c6e6-a990-46ea-8e43-9e84da2f758a
2024-12-07 16:34:04.589921	2024-12-07 16:34:04.589921	\N	\N	\N	9dda470f-0cba-4960-8913-de3faf24a6f8	Tại sao lại sử dụng Dev C++ mà không dùng Vscode ?	Vì Vscode thiếu ổn định	Vì Vscode nhiều lỗi	Vì giảng viên thích thế	Vì Dev C++ sẽ dễ setup và sử dụng hơn cho người mới bắt đầu	1	\N	D	10995d70-7674-41c8-8fbc-ff894489259a
2024-12-07 16:34:04.589921	2024-12-07 16:34:04.589921	\N	\N	\N	9a3a2db5-fb66-430a-894c-0a257c134345	Lệnh xuất dữ liệu trong C++ là gì ?	Đúng	Đúng	Sai	Sai	1	\N	A,B	66668607-6164-45f6-8313-c45cc3de35b1
2024-12-07 16:34:04.589921	2024-12-07 16:34:04.589921	\N	\N	\N	854fc778-e53c-4c12-a6da-2f407ee16a15	C++ dễ hay khó ?	Đúng	Đúng	Sai	Sai	1	\N	A,B	ec330914-c774-475d-8e19-10e113b9a09a
2024-12-01 00:48:29.223039	2024-12-01 00:58:40.084766	\N	\N	\N	d30f7fc1-6e8a-4493-8de4-05c3a1a26b87	temp-chJas1-0x8zL4v0w3d6-r	\N	\N	\N	\N	4	\N		\N
2024-12-01 00:48:40.121739	2024-12-01 00:58:45.949618	\N	\N	\N	565a239d-75fd-4b51-ae57-89f894954372	temp-CaGO177PrLlVhqlU0zitX	\N	\N	\N	\N	4	\N		\N
2024-12-05 11:28:30.391803	2024-12-08 04:08:35.504074	\N	\N	\N	b57624f4-0016-4d98-bcc4-f05e90d8f8a4	test1	Dung	Dung	Sai	Sai	1	test1	B,A	\N
2024-12-05 13:10:36.617823	2024-12-08 04:08:36.90621	\N	\N	\N	da4c06f5-395c-4cd2-95ac-5fc19e30fcd4	test2	d	d	s	s	1	test	B,A	\N
2024-11-30 16:34:25.328586	2024-12-02 14:54:32.803699	\N	\N	\N	e3fa45e3-2864-4751-a568-2a80fdb51aa8	temp-GGyqJx9EhNi9urdhGb47t222	2	2	2	A	2	22222	A,C	\N
2024-12-01 00:48:11.610281	2024-12-02 14:54:32.803699	\N	\N	\N	e6f10cab-4bfb-4d65-a9b8-02d779d3a685	temp-bsQIucr1ZFEs1ufNIJI8a	\N	\N	\N	\N	3	\N		\N
2024-12-01 00:58:43.293083	2024-12-02 14:54:32.803699	\N	\N	\N	beeaca1e-007b-4b3b-8b30-0560c290239f	temp-tNUEvSSbXk_n2g_jzGwAB	\N	\N	\N	\N	4	\N		\N
2024-12-01 01:00:49.811439	2024-12-02 14:54:32.803699	\N	\N	\N	2dd47882-0e89-4455-bb7c-28d10a5779c4	temp-XOi1m0-pDSUOpDXFM86qa	\N	\N	\N	\N	5	\N		\N
2024-12-01 01:12:00.352562	2024-12-02 14:54:32.803699	\N	\N	\N	d8167f32-0cea-4f3e-a7d1-2a1f80c64074	temp-57otk2ICQ0kKkEv4iwG1T	\N	\N	\N	\N	6	\N		\N
2024-12-01 05:32:36.217435	2024-12-02 14:54:32.803699	\N	\N	\N	f6fc7535-abbf-40ba-8cab-3049f140a46d	temp-1z1yM4LW4dcQA-hUyZ7ZK	\N	\N	\N	\N	7	\N		\N
2024-12-08 04:08:38.006	2024-12-08 04:08:50.993	\N	\N	\N	1b18eba8-e949-4369-b1c9-348cfb393c8d	test	S	S	D	S	1	sad	C	a09b2806-0ba2-48ff-ad28-0b9816bc791d
2024-12-05 09:43:54.306458	2024-12-05 09:44:35.124662	\N	\N	\N	a722de9f-bcb3-4acc-b424-6f9659e866b3	temp-PHWEc0QcqGdWlUkrVDduV	\N	\N	\N	\N	3	\N		\N
2024-12-17 03:25:39.17948	2024-12-17 03:34:05.921525	\N	\N	\N	8955dabe-da1d-4663-b093-4119d492fe86	ReactJS là gì?	Một framework của JavaScript	Một thư viện JavaScript để xây dựng giao diện người dùng	Một công cụ biên dịch JavaScript	Một ngôn ngữ lập trình mới	1	ReactJS là một thư viện JavaScript để xây dựng giao diện người dùng	B	e1bbd8f3-4dff-44dd-bfbd-abbe4e50bd88
2024-12-05 09:43:53.200488	2024-12-05 11:28:11.538421	\N	\N	\N	ccda6cdc-5035-4311-884a-567f6290c023	Test 2	Dung	Sai	Dung	Sai	2	test	C,A	\N
2024-12-05 09:44:36.249383	2024-12-05 11:28:13.507211	\N	\N	\N	6cbf2d92-0468-4596-afbb-16c3271a167b	Test 3	Sai	Dung	Sai	Sai	2	test	B	\N
2024-11-15 09:12:39.831143	2024-12-05 11:28:15.726819	\N	\N	\N	b233d9f0-5872-4723-b086-d5f43956d7e0	Tại sao trong khóa học này lại dùng Ubuntu bản 20.04 mà không phải bản mới hơn là 24.04 ?	Vì bản mới thiếu ổn định	Vì bản mới nhiều lỗi	Vì giảng viên thích thế	Vì bản 20.04 miễn phí còn bản 24.04 mất phí	1	\N	A,B	\N
2024-12-19 04:26:50.030951	2024-12-19 04:26:50.030951	\N	\N	\N	deb61f21-06d4-4088-b93c-7eece27ee553	temp-lcwZk6NHFaG2mLSPgNDPw	\N	\N	\N	\N	1	\N		68aaefe1-6ad6-4a06-bf1f-993c1f68c1a0
2024-12-19 04:26:50.842553	2024-12-19 04:26:50.842553	\N	\N	\N	3965ea7a-4fbd-4958-b0d8-78ddfcaeb760	temp-hXJvk2JxfB21xTHRQQwG4	\N	\N	\N	\N	2	\N		68aaefe1-6ad6-4a06-bf1f-993c1f68c1a0
2024-12-19 04:26:51.273336	2024-12-19 04:26:51.273336	\N	\N	\N	2d353dcc-b031-41d2-bda8-eaea6de0c2b0	temp--ZRsXxWuTh8GOjezuqZ24	\N	\N	\N	\N	3	\N		68aaefe1-6ad6-4a06-bf1f-993c1f68c1a0
2024-12-19 04:30:40.229662	2024-12-19 04:30:44.733542	\N	\N	\N	826c82e2-c8f9-44a7-b737-f90373e08533	temp-QMXMR8WxoASaW5RItgq20	\N	\N	\N	\N	6	\N		\N
2024-12-19 04:30:38.329199	2024-12-19 04:30:46.38891	\N	\N	\N	c8353d57-06f3-4ad3-b25d-e2c3bd34f0cb	temp-HP9YdoRbQnGRFi885R3w0	\N	\N	\N	\N	5	\N		\N
2024-12-19 04:26:51.663307	2024-12-19 04:30:48.497452	\N	\N	\N	0f50729d-e619-45e8-8ec7-f3234fc14a56	temp-s5Xfk438Ti3yEYGP-H7QA	\N	\N	\N	\N	4	\N		\N
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.role (create_at, update_at, create_by, update_by, delete_at, description, id) FROM stdin;
2024-09-29 06:54:24.783767	2024-09-29 06:54:24.783767	\N	\N	\N	\N	TECHNICAL_ADMIN
2024-10-02 04:37:11.142773	2024-10-02 04:37:11.142773	\N	\N	\N	\N	HELP_DESK
2024-10-02 04:37:11.142773	2024-10-02 04:37:11.142773	\N	\N	\N	\N	MANAGEMENT_ADMIN
2024-10-02 04:37:11.142773	2024-10-02 04:37:11.142773	\N	\N	\N	\N	BLD
2024-10-02 04:37:11.142773	2024-10-02 04:37:11.142773	\N	\N	\N	\N	CRM
2024-10-02 04:37:11.142773	2024-10-02 04:37:11.142773	\N	\N	\N	\N	HRM
2024-10-02 04:37:11.142773	2024-10-02 04:37:11.142773	\N	\N	\N	\N	ACCOUNTANT
2024-10-02 04:37:11.142773	2024-10-02 04:37:11.142773	\N	\N	\N	\N	STUDENT
2024-10-02 04:37:11.142773	2024-10-02 04:37:11.142773	\N	\N	\N	\N	LECTURER
\.


--
-- Data for Name: roles_permissions; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.roles_permissions (create_at, update_at, create_by, update_by, delete_at, role_id, permission_id) FROM stdin;
2024-10-02 04:53:52.936919	2024-10-02 04:53:52.936919	\N	\N	\N	MANAGEMENT_ADMIN	MANAGE_COURSE
2024-10-02 04:53:52.936919	2024-10-02 04:53:52.936919	\N	\N	\N	MANAGEMENT_ADMIN	MANAGE_EMPLOYEE
2024-10-02 04:54:14.838999	2024-10-02 04:54:14.838999	\N	\N	\N	MANAGEMENT_ADMIN	MANAGE_STUDENT
2024-10-02 08:38:46.330898	2024-10-02 08:38:46.330898	\N	\N	\N	MANAGEMENT_ADMIN	MANAGE_LECTURER
2024-10-02 09:28:57.805318	2024-10-02 09:28:57.805318	\N	\N	\N	MANAGEMENT_ADMIN	APPROVE_LECTURER_REGISTER
\.


--
-- Data for Name: student_complete_lessons; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.student_complete_lessons (lesson_id, student_id, create_at, progress, is_complete, complete_at) FROM stdin;
75911fc3-6d2d-4a91-8e75-90644af161fc	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	2024-12-16 23:03:39.785	100	t	\N
f032bdee-e417-45e9-9ba1-42395510e050	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	2024-12-13 16:54:03.454	0	f	\N
59faae67-3257-4987-b60e-af3cd5cbb0fc	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	2024-12-03 20:32:21.037	100	t	2024-12-03 20:50:20
59faae67-3257-4987-b60e-af3cd5cbb0fc	740034a9-1e8a-4b0d-a8e8-549914b6dd21	2024-12-14 20:07:01.895	2	f	\N
59faae67-3257-4987-b60e-af3cd5cbb0fc	488a5b1b-1f64-4c8e-8a54-641e75973503	2024-12-08 11:34:53.762	30	f	\N
e35dda2c-6f3b-416b-8aed-73d5a38b4dec	488a5b1b-1f64-4c8e-8a54-641e75973503	2024-12-08 11:35:46.987	20	f	\N
5a9f92db-b826-4345-b671-c5ff4ad55260	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	2024-12-19 04:47:51.979	100	t	\N
416d6d9a-1823-4852-bd97-1d51f36518d4	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	2024-12-11 07:03:09.214	100	t	\N
75911fc3-6d2d-4a91-8e75-90644af161fc	e8e2b77b-170e-4d64-bcbc-bdd16ec8687b	2024-12-17 20:33:53.133	124300	t	\N
96cb98b0-8eab-4bae-bb35-f83a713c741f	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	2024-12-12 14:59:34.677	2	f	\N
aa9a011f-ad49-4dc3-9321-0f2850e11384	7d302099-c41b-4aae-9a7e-d89cf0ee22f9	2024-12-19 00:31:12.204	56	f	\N
e18cd519-5ec9-4d77-af84-2ee8bdfcb62c	7d302099-c41b-4aae-9a7e-d89cf0ee22f9	2024-12-19 00:28:25.966	77	f	\N
96cb98b0-8eab-4bae-bb35-f83a713c741f	7d302099-c41b-4aae-9a7e-d89cf0ee22f9	2024-12-19 00:31:46.633	100	t	\N
416d6d9a-1823-4852-bd97-1d51f36518d4	740034a9-1e8a-4b0d-a8e8-549914b6dd21	2024-12-14 20:10:08.395	8	f	\N
e18cd519-5ec9-4d77-af84-2ee8bdfcb62c	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	2024-12-12 15:16:25.861	3	f	\N
aa9a011f-ad49-4dc3-9321-0f2850e11384	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	2024-12-12 16:30:01.251	44	f	\N
50811bf0-b1aa-4093-9fe9-7c8c848a21a1	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	2024-12-19 00:35:11.581	20	f	\N
\.


--
-- Data for Name: student_complete_quizzes; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.student_complete_quizzes (quiz_id, student_id, create_at) FROM stdin;
0f655838-a167-4d7e-978c-11da872d26f7	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	2024-12-05 06:59:02.61962
b233d9f0-5872-4723-b086-d5f43956d7e0	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	2024-12-05 07:17:50.380083
ccda6cdc-5035-4311-884a-567f6290c023	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	2024-12-05 10:37:59.607819
6cbf2d92-0468-4596-afbb-16c3271a167b	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	2024-12-05 10:37:59.620063
b57624f4-0016-4d98-bcc4-f05e90d8f8a4	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	2024-12-05 11:29:11.368375
1b18eba8-e949-4369-b1c9-348cfb393c8d	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	2024-12-09 06:05:37.612996
1b18eba8-e949-4369-b1c9-348cfb393c8d	740034a9-1e8a-4b0d-a8e8-549914b6dd21	2024-12-14 13:10:07.115745
9dda470f-0cba-4960-8913-de3faf24a6f8	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	2024-12-15 07:55:03.197489
854fc778-e53c-4c12-a6da-2f407ee16a15	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	2024-12-15 08:55:34.031718
9a3a2db5-fb66-430a-894c-0a257c134345	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	2024-12-16 15:17:33.150965
9a3a2db5-fb66-430a-894c-0a257c134345	7d302099-c41b-4aae-9a7e-d89cf0ee22f9	2024-12-18 17:29:09.872102
854fc778-e53c-4c12-a6da-2f407ee16a15	7d302099-c41b-4aae-9a7e-d89cf0ee22f9	2024-12-18 17:29:27.730171
deb61f21-06d4-4088-b93c-7eece27ee553	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	2024-12-19 07:39:22.72574
3965ea7a-4fbd-4958-b0d8-78ddfcaeb760	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	2024-12-19 07:39:45.987238
2d353dcc-b031-41d2-bda8-eaea6de0c2b0	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	2024-12-19 07:40:03.009474
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.students (create_at, update_at, create_by, update_by, delete_at, id, name, email, phone_number, password, role_id, google_id, facebook_id, avatar, address, birthday) FROM stdin;
2024-10-11 10:06:40.052492	2024-10-11 10:06:40.052492	\N	\N	\N	b06e0563-e53b-4f15-8283-9212bdc2c7bd	Thịnh Phú	haphuthinh332004@gmail.com	\N	$2b$10$sWSyuYeBirwnMXNZodmzLel2ezw4gGy9tJrvmrG1Qtk5PnMLTBe.W	STUDENT	104488863102429832140	\N	https://lh3.googleusercontent.com/a/ACg8ocKw_sM4WXW5oE3wJqAlTxcHaBfsB_GZ-rw8lZdzKxivyZOIvadB=s96-c	\N	\N
2024-10-15 04:07:21.143056	2024-10-15 04:07:21.143056	\N	\N	\N	997a2a0a-8545-46cd-aec5-b0c60355f281	Thịnh Hà Phú	22521405@gm.uit.edu.vn	\N	$2b$10$KfqTG9QTaAP29PXQlfZzI.UCvtzch9sWdybxxDSza3lFVGUBzjwX.	STUDENT	109748593329838623697	\N	https://lh3.googleusercontent.com/a/ACg8ocJHiAU1G7og7McnS0Bkiud6BENJz4Gb7mSqnI0MLHd-60UzIA=s96-c	\N	\N
2024-10-27 11:39:45.528604	2024-10-27 11:39:45.528604	\N	\N	\N	ecee3fc7-cb13-4023-9c90-74b906501386	Trần Hoàng	tranhoang332004@gmail.com	\N	$2b$10$2S6rj1ePQiY9F4/EIPWmKemMMrk4uwGh0NERs0dZxWVnPOmM/9woS	STUDENT	112863371347720345296	\N	https://lh3.googleusercontent.com/a/ACg8ocLAo5ga6Q3bQQ65_tsJsK49VWHdxvc-gEzYbnIZZJqvVvFaSA=s96-c	\N	\N
2024-10-15 04:06:04.581496	2024-10-15 04:06:04.581496	\N	\N	\N	d0c85e17-7f35-440a-bfb1-7472624287a1	Cha Bu	haphuthinh3362@gmail.com	\N	$2b$10$yx0tC4BAJ2gObmoE0J23jOqmsXEyiymPyNU4tizUCmIQ3ZHimxQeS	STUDENT	113771013742446745583	\N	https://lh3.googleusercontent.com/a/ACg8ocLs6hJIeXWPl7lqLzEgEwUmRI4CiMt1vCrDQBhm29B2k801o0mNOg=s96-c	\N	\N
2024-10-31 12:40:43.286089	2024-10-31 12:40:43.286089	\N	\N	\N	3a69a0c9-a7de-4f93-9a6d-0410e38af0b7	Hà Phú Thịnh	haphuthinh3364@gmail.com	\N	$2b$10$Hc0U4Tz499VYmNcvgCCnVufLgYE..pL.LIX64itfBdYetpvhoq7Yq	STUDENT	\N	1736203403883169	https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1736203403883169&height=50&width=50&ext=1732970442&hash=Abbto8TMqniOGHV40fZd2U1b	\N	\N
2024-11-07 11:18:17.567769	2024-11-07 11:18:17.567769	\N	\N	\N	259cb49b-7584-466c-80ee-34548d95cb20	Nguyen Sang	lc23ar@gmail.com	\N	$2b$10$kwXAa.KpLqSYLlMNNqqlrO5LtViTT4./6UJ8Gs6wLKLnRdMuxtri2	STUDENT	\N	\N	\N	\N	\N
2024-11-07 11:18:25.510665	2024-11-07 11:18:25.510665	\N	\N	\N	44badb88-ab1b-470b-920a-bd951dc71cff	Nguyen Sang	lc23ar@gmail.com	\N	$2b$10$kwXAa.KpLqSYLlMNNqqlrO5LtViTT4./6UJ8Gs6wLKLnRdMuxtri2	STUDENT	\N	\N	\N	\N	\N
2024-11-08 14:41:07.497738	2024-11-08 14:41:07.497738	\N	\N	\N	69929ffb-c9f6-4a76-8e20-c6ff90162fbf	Thien Ha	thienha89f@gmail.com	\N	$2b$10$fUpTxiuWZOBu2juUmaF2eOJJ0Du1MUSmr7wb6Yy2K8iWGrN3d/E/a	STUDENT	105236472986757553636	\N	https://lh3.googleusercontent.com/a/ACg8ocJmeb2GOahvMOuLe6wmMsaUEQUbAIrs-r66JPPldvP4haQzww=s96-c	\N	\N
2024-10-31 09:33:41.286503	2024-11-15 01:42:30.121303	\N	\N	\N	930c9500-c247-4f18-95dd-f0f54bc2e3ec	Cha Bu	\N	+84933516434	$2b$10$.RgnCsOmJBDlao8f6MQuye0M3S16CrBslfjXOHczfh2Q9uF5xKEke	STUDENT	\N	\N	\N	\N	\N
2024-11-01 14:44:19.937507	2024-11-15 05:31:55.537178	\N	\N	\N	543bdbdf-5361-4eac-9094-49ba9182d034	Thanh Sang	20521833@gm.uit.edu.vn	\N	$2b$10$MYGz1oJv2fMBnD/5fORtyOAH4i7dF/T3nBPi.3/UfW45bsR.Xx0sS	STUDENT	\N	\N	\N	\N	\N
2024-11-16 09:41:40.385076	2024-11-16 09:41:40.385076	\N	\N	\N	09aa11c1-d922-4e8a-8427-c9f4c36138c0	Phan Khoa	tuankhoaanh2104@gmail.com	\N	$2b$10$bFIZB4mYSqDZpicWMTpmq.45OKifVa6YhNiR73aHgWXqICu52MMri	STUDENT	\N	\N	\N	\N	\N
2024-12-13 01:37:25.48751	2024-12-13 01:37:25.48751	\N	\N	\N	e8e2b77b-170e-4d64-bcbc-bdd16ec8687b	Nguyễn Hiếu	nhdhieuu@gmail.com	\N	$2b$10$Q5./bDfqHU4/Uv3T757yqu4dFjINQpS4IcdUWQnOW9jR5JGCuYXa2	STUDENT	\N	\N	\N	\N	\N
2024-10-31 09:30:53.931	2024-12-18 13:14:34.058312	\N	\N	\N	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	Thịnh Văn Hà 1	chabu332004@gmail.com	\N	$2b$10$0bqcWN6/ops0dgOrTyy/3OQIkVS/ZS54gztAZa82nTPKmqIDV7GZ.	STUDENT	\N	\N	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE1BRPUWJj_CFhEFtQAz_2OD3lwiayL4buxg&s	Dong Hoa Di An	1997-02-19
2024-12-14 17:07:41.551778	2024-12-14 17:07:41.551778	\N	\N	\N	3a8ce626-e977-4de2-a4e8-09466b11433e	Thịnh Hà	nhdhieuu123@gmail.com	\N	$2b$10$MDnZTpIeyBXw2uHF0luwROEiVmSEPR7PqhS7RXy6OR7PitVcQa.fq	STUDENT	\N	\N	\N	\N	\N
2024-12-14 18:06:40.727592	2024-12-14 18:06:40.727592	\N	\N	\N	75dd598e-36c9-455f-a185-0ec8a7caf482	Híu N	phanchauhoang2004@gmail.com	\N	$2b$10$/6S74zeRn4fSC7tVyQjHoeHhU8pfWyisBGQ0wz0mOmjq3LOrKrtuq	STUDENT	\N	\N	\N	\N	\N
2024-12-15 07:39:19.430449	2024-12-15 07:39:19.430449	\N	\N	\N	19c672ef-e436-44d9-a76a-853e5b65ca8d	Híu N	hba6969692000@gmail.com	\N	$2b$10$o5luMddVXfpcbD8EHebg5.XVWtZ0MQD7n2pqkIHxqEl76pFcOxHiW	STUDENT	\N	\N	\N	\N	\N
2024-10-31 13:34:20.181686	2024-12-17 15:16:52.790439	\N	\N	\N	488a5b1b-1f64-4c8e-8a54-641e75973503	Cha Bu	\N	+84868042952	$2b$10$1rZA7FJmNEH.u7RO258wZutOdgbM5ZGJHmoZX14vNPvftTfdeknUG	STUDENT	\N	\N	\N	\N	\N
2024-12-18 17:23:41.261368	2024-12-18 17:25:07.017297	\N	\N	\N	7d302099-c41b-4aae-9a7e-d89cf0ee22f9	Thịnh nè	22520439@gm.uit.edu.vn	\N	$2b$10$If2FjbMcDitxrB.AxSDceukuswOMkX1Sy2loqSNaLmYhqJABnv/ki	STUDENT	\N	\N	\N	UIT	2024-12-18
2024-12-19 07:38:33.235695	2024-12-19 07:38:33.235695	\N	\N	\N	2848b3ab-0109-4341-b265-6b65c5da3a83	Hoàng Huy	cuhuy2004vn@gmail.com	\N	$2b$10$zjyudcQD/qLaeLWGBIwB7ubhEMYmljeSzhI3Ta.YgEIHYkx0A7eNO	STUDENT	\N	\N	\N	\N	\N
2024-11-11 04:43:23.779	2024-12-18 08:59:36.700241	\N	\N	2024-12-18 08:59:36.603	740034a9-1e8a-4b0d-a8e8-549914b6dd21	Thanh Sang Nguyễn	nguyenthanhsang22vn@gmail.com	\N	$2b$10$lokrWMky7TaaTS/fQ3PYweKd6Ez4uEuT/skWPbpHPaJ7IM/9TJ5.C	STUDENT	110291808970448874122	\N	https://csairs.website/media/eduhub-image/beautiful-cat-pictures-5tip8bthlnn093am.jpg	Sao hoả 356	2024-12-11
2024-12-18 09:00:46.742004	2024-12-18 09:02:30.235192	\N	\N	2024-12-18 09:02:30.068	42d93c29-d2c3-4da8-bdeb-cb273b6e7be1	Nguyen Sang	nguyenthanhsang22vn@gmail.com	\N	$2b$10$LySKGZj/QGBifNq4UxdAauXRmrk3ylQPKxZN5Du1ricrzugUSOt3.	STUDENT	\N	\N	\N	\N	\N
2024-12-18 09:10:43.325019	2024-12-18 09:21:48.378911	\N	\N	\N	006e14c6-66bb-4b9e-97ae-2730126553fa	Nguyen Sang	nguyenthanhsang22vn@gmail.com	\N	$2b$10$udbV6qpnCIjSIpWCkMoxFe1qvzUJRFT1Fy.3gOCuUnDL1g5ZlzCim	STUDENT	\N	\N	https://csairs.website/media/eduhub-image/beautiful-cat-pictures-5tip8bthlnn093am.jpg		2024-12-01
\.


--
-- Data for Name: test; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.test  FROM stdin;
\.


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev_account
--

SELECT pg_catalog.setval('public.migrations_id_seq', 39, true);


--
-- Name: roles_permissions PK_0cd11f0b35c4d348c6ebb9b36b7; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.roles_permissions
    ADD CONSTRAINT "PK_0cd11f0b35c4d348c6ebb9b36b7" PRIMARY KEY (role_id, permission_id);


--
-- Name: orders_items PK_0fd87b790d35ac255b17f6a3bd1; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.orders_items
    ADD CONSTRAINT "PK_0fd87b790d35ac255b17f6a3bd1" PRIMARY KEY (id);


--
-- Name: payments PK_197ab7af18c93fbb0c9b28b4a59; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY (id);


--
-- Name: courses PK_3f70a487cc718ad8eda4e6d58c9; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY (id);


--
-- Name: cart_items PK_4c121e936f32192e817b50ae22a; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT "PK_4c121e936f32192e817b50ae22a" PRIMARY KEY (cart_id, course_id);


--
-- Name: lecturers PK_4dffa0b38d36bfd09610d64b399; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.lecturers
    ADD CONSTRAINT "PK_4dffa0b38d36bfd09610d64b399" PRIMARY KEY (id);


--
-- Name: account PK_54115ee388cdb6d86bb4bf5b2ea; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY (id);


--
-- Name: course_categories PK_626794960514393da07e942f8d0; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.course_categories
    ADD CONSTRAINT "PK_626794960514393da07e942f8d0" PRIMARY KEY (id);


--
-- Name: discounts PK_66c522004212dc814d6e2f14ecc; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.discounts
    ADD CONSTRAINT "PK_66c522004212dc814d6e2f14ecc" PRIMARY KEY (id);


--
-- Name: notification PK_705b6c7cdf9b2c2ff7ac7872cb7; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.notification
    ADD CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY (id);


--
-- Name: orders PK_710e2d4957aa5878dfe94e4ac2f; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY (id);


--
-- Name: lesson_parts PK_7a720f7f225001dcb713c013cdd; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.lesson_parts
    ADD CONSTRAINT "PK_7a720f7f225001dcb713c013cdd" PRIMARY KEY (id);


--
-- Name: students PK_7d7f07271ad4ce999880713f05e; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY (id);


--
-- Name: enrollments PK_850389020f5faddd405e2792634; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT "PK_850389020f5faddd405e2792634" PRIMARY KEY (student_id, course_id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: permissions PK_920331560282b8bd21bb02290df; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY (id);


--
-- Name: lessons PK_9b9a8d455cac672d262d7275730; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT "PK_9b9a8d455cac672d262d7275730" PRIMARY KEY (id);


--
-- Name: course_keys PK_a4ee2bdeb1f01a7a75b65e9af2d; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.course_keys
    ADD CONSTRAINT "PK_a4ee2bdeb1f01a7a75b65e9af2d" PRIMARY KEY (key);


--
-- Name: quizzes PK_b24f0f7662cf6b3a0e7dba0a1b4; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT "PK_b24f0f7662cf6b3a0e7dba0a1b4" PRIMARY KEY (id);


--
-- Name: role PK_b36bcfe02fc8de3c57a8b2391c2; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY (id);


--
-- Name: carts PK_b5f695a59f5ebb50af3c8160816; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY (id);


--
-- Name: employees PK_b9535a98350d5b26e7eb0c26af4; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY (id);


--
-- Name: student_complete_quizzes PK_e04f3f30e5cbfa153fd61c1f0f0; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.student_complete_quizzes
    ADD CONSTRAINT "PK_e04f3f30e5cbfa153fd61c1f0f0" PRIMARY KEY (quiz_id, student_id);


--
-- Name: course_ratings PK_ea1fcdbcda76cdeb72ea8cf4530; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.course_ratings
    ADD CONSTRAINT "PK_ea1fcdbcda76cdeb72ea8cf4530" PRIMARY KEY (id);


--
-- Name: student_complete_lessons PK_ff7c717edb49aa98faa61f32ee5; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.student_complete_lessons
    ADD CONSTRAINT "PK_ff7c717edb49aa98faa61f32ee5" PRIMARY KEY (lesson_id, student_id);


--
-- Name: employees UQ_027a331b2053bb37f39fb2704fb; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "UQ_027a331b2053bb37f39fb2704fb" UNIQUE (phone_number);


--
-- Name: carts UQ_0a8f2564b9524637d2bd0fca0cb; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT "UQ_0a8f2564b9524637d2bd0fca0cb" UNIQUE (student_id);


--
-- Name: lecturers UQ_3bf0b8dac54e0e07b5c3078f52d; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.lecturers
    ADD CONSTRAINT "UQ_3bf0b8dac54e0e07b5c3078f52d" UNIQUE (email);


--
-- Name: lecturers UQ_59e50bc884350d532a8db289aa8; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.lecturers
    ADD CONSTRAINT "UQ_59e50bc884350d532a8db289aa8" UNIQUE (phone_number);


--
-- Name: orders UQ_5b3e94bd2aedc184f9ad8c10439; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "UQ_5b3e94bd2aedc184f9ad8c10439" UNIQUE (payment_id);


--
-- Name: employees UQ_765bc1ac8967533a04c74a9f6af; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "UQ_765bc1ac8967533a04c74a9f6af" UNIQUE (email);


--
-- Name: carts FK_0a8f2564b9524637d2bd0fca0cb; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT "FK_0a8f2564b9524637d2bd0fca0cb" FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: student_complete_quizzes FK_14ad7445b0382149f633806b8b9; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.student_complete_quizzes
    ADD CONSTRAINT "FK_14ad7445b0382149f633806b8b9" FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: lessons FK_1a31f0838f4afc7f678e011873f; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT "FK_1a31f0838f4afc7f678e011873f" FOREIGN KEY (lesson_part_id) REFERENCES public.lesson_parts(id) ON DELETE CASCADE;


--
-- Name: course_keys FK_222889c2e1957518186984d9b85; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.course_keys
    ADD CONSTRAINT "FK_222889c2e1957518186984d9b85" FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: enrollments FK_307813fe255896d6ebf3e6cd55c; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT "FK_307813fe255896d6ebf3e6cd55c" FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: students FK_324b2737f793bd3403f922c31d8; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT "FK_324b2737f793bd3403f922c31d8" FOREIGN KEY (role_id) REFERENCES public.role(id);


--
-- Name: course_ratings FK_32b68ae69d8fb9200a854d6b331; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.course_ratings
    ADD CONSTRAINT "FK_32b68ae69d8fb9200a854d6b331" FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;


--
-- Name: roles_permissions FK_337aa8dba227a1fe6b73998307b; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.roles_permissions
    ADD CONSTRAINT "FK_337aa8dba227a1fe6b73998307b" FOREIGN KEY (permission_id) REFERENCES public.permissions(id);


--
-- Name: orders_items FK_3484e73ecd5e701e72db44294c5; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.orders_items
    ADD CONSTRAINT "FK_3484e73ecd5e701e72db44294c5" FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE SET NULL;


--
-- Name: student_complete_lessons FK_430643a97b173fcfc68401882ea; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.student_complete_lessons
    ADD CONSTRAINT "FK_430643a97b173fcfc68401882ea" FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON DELETE CASCADE;


--
-- Name: lecturers FK_462d85d7909b9669351df2276ed; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.lecturers
    ADD CONSTRAINT "FK_462d85d7909b9669351df2276ed" FOREIGN KEY (role_id) REFERENCES public.role(id);


--
-- Name: course_ratings FK_4a29f927ecdb55acc334e8dae1d; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.course_ratings
    ADD CONSTRAINT "FK_4a29f927ecdb55acc334e8dae1d" FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: quizzes FK_5322dcee0b05335d74a46b72cfc; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT "FK_5322dcee0b05335d74a46b72cfc" FOREIGN KEY (lesson_part_id) REFERENCES public.lesson_parts(id) ON DELETE CASCADE;


--
-- Name: orders_items FK_53c21b56c3eebe5cd88525ccd6e; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.orders_items
    ADD CONSTRAINT "FK_53c21b56c3eebe5cd88525ccd6e" FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE SET NULL;


--
-- Name: orders FK_5b3e94bd2aedc184f9ad8c10439; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_5b3e94bd2aedc184f9ad8c10439" FOREIGN KEY (payment_id) REFERENCES public.payments(id) ON DELETE SET NULL;


--
-- Name: cart_items FK_6385a745d9e12a89b859bb25623; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT "FK_6385a745d9e12a89b859bb25623" FOREIGN KEY (cart_id) REFERENCES public.carts(id) ON DELETE CASCADE;


--
-- Name: courses FK_667f9ddd37aab68ff127dca9de2; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT "FK_667f9ddd37aab68ff127dca9de2" FOREIGN KEY (lecturer_id) REFERENCES public.lecturers(id);


--
-- Name: orders FK_6c846a094b1989e1a202558803b; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_6c846a094b1989e1a202558803b" FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE SET NULL;


--
-- Name: employees FK_727d9c30d77d3a253177b2e918f; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "FK_727d9c30d77d3a253177b2e918f" FOREIGN KEY (role_id) REFERENCES public.role(id);


--
-- Name: roles_permissions FK_7d2dad9f14eddeb09c256fea719; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.roles_permissions
    ADD CONSTRAINT "FK_7d2dad9f14eddeb09c256fea719" FOREIGN KEY (role_id) REFERENCES public.role(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cart_items FK_82206f0c18875a8d46fb35182d6; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT "FK_82206f0c18875a8d46fb35182d6" FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;


--
-- Name: lesson_parts FK_8d1aa6f6e5e12cd5e1423532b4c; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.lesson_parts
    ADD CONSTRAINT "FK_8d1aa6f6e5e12cd5e1423532b4c" FOREIGN KEY (course_id) REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: student_complete_lessons FK_968b667f67d5503144a7b364f59; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.student_complete_lessons
    ADD CONSTRAINT "FK_968b667f67d5503144a7b364f59" FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- Name: student_complete_quizzes FK_a63fd390a26b35cbea81410bab7; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.student_complete_quizzes
    ADD CONSTRAINT "FK_a63fd390a26b35cbea81410bab7" FOREIGN KEY (quiz_id) REFERENCES public.quizzes(id) ON DELETE CASCADE;


--
-- Name: enrollments FK_b79d0bf01779fdf9cfb6b092af3; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT "FK_b79d0bf01779fdf9cfb6b092af3" FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;


--
-- Name: discounts FK_c15fc9837677fa4214aa7de3b82; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.discounts
    ADD CONSTRAINT "FK_c15fc9837677fa4214aa7de3b82" FOREIGN KEY ("courseId") REFERENCES public.courses(id) ON DELETE CASCADE;


--
-- Name: course_keys FK_e014bd90ac6e913fbca39122e3a; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.course_keys
    ADD CONSTRAINT "FK_e014bd90ac6e913fbca39122e3a" FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;


--
-- Name: orders_items FK_e126fa247324af30621e1cb8335; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.orders_items
    ADD CONSTRAINT "FK_e126fa247324af30621e1cb8335" FOREIGN KEY (course_key) REFERENCES public.course_keys(key) ON DELETE SET NULL;


--
-- Name: courses FK_e4c260fe6bb1131707c4617f745; Type: FK CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT "FK_e4c260fe6bb1131707c4617f745" FOREIGN KEY (category_id) REFERENCES public.course_categories(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT ALL ON SCHEMA public TO dev_account;


--
-- Name: TABLE test; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.test TO dev_account;


--
-- PostgreSQL database dump complete
--

