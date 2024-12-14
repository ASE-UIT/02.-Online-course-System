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
    course_id uuid NOT NULL
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
    avatar text
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
00414c6d-6d41-4f24-bf0e-429f3fe98cff	95eabf10-5a9a-45db-ab13-9c37c390b4c2
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
2024-11-14 19:15:58.674532	2024-11-14 19:15:58.674532	\N	\N	\N	c643b4eb-c6ed-4b78-b5c0-61139f3a08da	95eabf10-5a9a-45db-ab13-9c37c390b4c2	5	Khóa học rất hữu ích	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	0	0
2024-11-14 19:16:51.859635	2024-11-14 19:16:51.859635	\N	\N	\N	75cdb6e0-e3af-4920-a56f-38951379cb22	95eabf10-5a9a-45db-ab13-9c37c390b4c2	5	Khóa học rất hữu ích	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	0	0
2024-11-14 19:18:21.208951	2024-11-14 19:18:21.208951	\N	\N	\N	0670d1f6-e52b-4ea3-b62c-87a827fcfb35	95eabf10-5a9a-45db-ab13-9c37c390b4c2	5	Khóa học rất hữu ích	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	0	0
2024-11-14 21:30:18.161897	2024-11-14 21:30:18.161897	\N	\N	\N	edff971b-3a2c-4d5b-89c0-84ef58c4a592	95eabf10-5a9a-45db-ab13-9c37c390b4c2	4	10 điểm cho khóa học	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	0	0
\.


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.courses (create_at, update_at, create_by, update_by, delete_at, id, name, thumbnail, duration, difficulty_level, start_date, end_date, category_id, lecturer_id, is_approved, name_en, original_price, sell_price, short_description, introduction, participants, course_targets, welcome_join, video_sale, course_materials, lowest_price, "socialGroupLink", "courseLink", tags, is_free_course, start_free_date, end_free_date, status, total_students, total_reviews, average_rating) FROM stdin;
2024-11-19 06:30:23.61962	2024-11-19 08:00:32.185378	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	c15ff891-9129-41a5-b85f-e687fc4c5213	Lập trình Java Spring Boot Backend cho người mới bắt đầu	https://example.com/image.png	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	This is a beginner level course for Spring Boot Developer.	Khóa học dành cho người mới bắt đầu	Ai có thể tham gia khóa học này: 1. Sinh viên IT đã từng tiếp xúc với lập trình. 2. Lập trình viên đang quan tâm tới Java Spring Boot	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-04 13:37:01.829644	2024-12-04 13:37:01.829644	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	b408c117-5f53-4bff-9e0c-3d069685536f	32135135	undefined	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	312312	\N	3123123	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-02 14:55:28.46418	2024-12-02 14:55:28.46418	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	0f855ee9-6346-4e99-ae5a-8f9db7626172	Lập trình Java Spring Boot Backend cho người mới bắt đầu	https://example.com/image.png	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	This is a beginner level course for Spring Boot Developer.	Khóa học dành cho người mới bắt đầu	Ai có thể tham gia khóa học này: 1. Sinh viên IT đã từng tiếp xúc với lập trình. 2. Lập trình viên đang quan tâm tới Java Spring Boot	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-02 15:01:03.580875	2024-12-02 15:01:03.580875	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	9c05c92e-45e3-4e4d-b4ac-f5f4c0ea5c99	Lập trình Java Spring Boot Backend cho người mới bắt đầu	https://example.com/image.png	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	This is a beginner level course for Spring Boot Developer.	Khóa học dành cho người mới bắt đầu	Ai có thể tham gia khóa học này: 1. Sinh viên IT đã từng tiếp xúc với lập trình. 2. Lập trình viên đang quan tâm tới Java Spring Boot	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-02 14:18:55.5149	2024-12-02 14:18:55.5149	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	4842e41d-9f78-4e40-b359-0ab6c4a6382a	Lập trình Java Spring Boot Backend cho người mới bắt đầu	https://example.com/image.png	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	This is a beginner level course for Spring Boot Developer.	Khóa học dành cho người mới bắt đầu	Ai có thể tham gia khóa học này: 1. Sinh viên IT đã từng tiếp xúc với lập trình. 2. Lập trình viên đang quan tâm tới Java Spring Boot	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-02 15:05:35.888067	2024-12-02 15:05:35.888067	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	a180ec7d-73d9-453d-9dfc-e18400b9efd9	Lập trình Java Spring Boot Backend cho người mới bắt đầu	https://example.com/image.png	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	This is a beginner level course for Spring Boot Developer.	Khóa học dành cho người mới bắt đầu	Ai có thể tham gia khóa học này: 1. Sinh viên IT đã từng tiếp xúc với lập trình. 2. Lập trình viên đang quan tâm tới Java Spring Boot	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-02 14:44:48.653094	2024-12-02 14:44:48.653094	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	a805c136-ba5a-47bf-a1b8-519a1104414f	Lập trình Java Spring Boot Backend cho người mới bắt đầu	https://example.com/image.png	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	This is a beginner level course for Spring Boot Developer.	Khóa học dành cho người mới bắt đầu	Ai có thể tham gia khóa học này: 1. Sinh viên IT đã từng tiếp xúc với lập trình. 2. Lập trình viên đang quan tâm tới Java Spring Boot	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-02 14:50:46.175224	2024-12-02 14:50:46.175224	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	66c93332-3e00-44bf-b8a7-853549b30aa7	Lập trình Java Spring Boot Backend cho người mới bắt đầu	https://example.com/image.png	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	This is a beginner level course for Spring Boot Developer.	Khóa học dành cho người mới bắt đầu	Ai có thể tham gia khóa học này: 1. Sinh viên IT đã từng tiếp xúc với lập trình. 2. Lập trình viên đang quan tâm tới Java Spring Boot	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-10-27 09:36:12.893532	2024-11-19 09:59:20.495153	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	Lập trình NodeJS Backend cho người mới bắt đầu	https://example.com/image.png	10.5	easy	2024-01-01	2024-02-01	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	t	\N	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-11-15 03:06:50.5221	2024-11-19 10:01:32.051709	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	4ee424a6-48c3-4f84-b89a-119a51557c92	Lập trình Java Spring Boot Backend cho người mới bắt đầu	https://example.com/image.png	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-04 13:37:01.839327	2024-12-04 13:37:01.839327	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	4c9add54-237a-402d-a1ae-4eaf6c327359	32135135	undefined	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	312312	\N	3123123	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-04 13:37:17.305704	2024-12-04 13:37:17.305704	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	ebe4337e-e739-4b0d-b2b2-5ea07a57ca65	32135135	undefined	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	312312	\N	3123123	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-05 12:30:41.601119	2024-12-05 12:30:41.601119	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	6cb94251-592f-4cdf-b66d-4344db83a341	Thiet ke trang phuc T1	undefined	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	3153435	\N	5345	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-04 14:22:54.070167	2024-12-04 14:22:54.070167	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	6a26b34c-067f-4444-882c-1e657b1f5f8f	Khoa Khung	undefined	0.0	easy	\N	\N	66f73da5-ac8a-468c-ae99-a6952b45410d	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	koa khugbn	\N	312312	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-10-27 09:15:41.775035	2024-11-19 15:46:03.618313	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	469d5513-81d6-43c8-ae81-edbd778966be	Lập trình Golang Backend cho người mới bắt đầu	https://example.com/image.png	10.5	easy	2024-01-01	2024-02-01	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-04 14:22:55.220649	2024-12-04 14:22:55.220649	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	619298f1-adbf-44a6-ac16-3ff7f9bd1680	Khoa Khung	undefined	0.0	easy	\N	\N	66f73da5-ac8a-468c-ae99-a6952b45410d	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	koa khugbn	\N	312312	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-05 12:47:14.140115	2024-12-05 12:47:14.140115	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	96eed2aa-f9d7-4348-afaa-c2a3921974bd	Thiet ke trang phuc T1	https://csairs.website/media/eduhub-image/3702ac63-bda5-4df5-b740-02129157ed9d	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	31231	\N	3121	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-07 14:51:37.18219	2024-12-07 16:34:04.589921	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	30d2b059-716e-445e-ad20-bd7341d7adda	Lập trình C++ từ cơ bản đến nâng cao	https://i.ytimg.com/vi/Da1tpV9TMU0/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLC7hegpDz0ZOzdyzr9zrbXXIv2PtQ	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	C++ from begin to advance	150000	120000	Khóa học Lập trình C++ từ cơ bản đến nâng cao sẽ mang tới cho các bạn kiến thức chi tiết từ cơ bản cho tới nâng cao về C++	Khóa học dành cho người mới bắt đầu	Ai có thể tham gia khóa học này: 1. Sinh viên IT đã từng tiếp xúc với lập trình. 2. Lập trình viên đang quan tâm tới C++	Thành thạo các C++ cơ bản,Có nền tảng để tiếp tục con đường lập trình sau này	Chào mừng bạn đã đến với khóa học.		http://file.pdf	0	https://facebook.com.vn	https://course.com.vn	c++,programing,beginer	f	\N	\N	PUBLISHED	0	0	0
2024-10-09 02:51:37.442064	2024-12-12 07:55:05.529075	\N	\N	\N	95eabf10-5a9a-45db-ab13-9c37c390b4c2	Devops cho người mới bắt đầu	https://csairs.website/media/eduhub-image/37c021c1-9274-4b03-9f1b-9d0851e1b26a	20.0	medium	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	t	Devops for fresher	100000	120000	Khóa học Devops cho người mới bắt đầu. Tất tần tật mọi thứ từ Linux, Docker, CI/CD, K8S, Cloud,...	<p><strong style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">Bạn có biết:</strong></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">Khóa học "Cẩm nang A-Z Illustrator cho Designer" chính là dành cho bạn, người...</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">Đam mê yêu thích đồ họa, nhiếp ảnh, thiết kế sản phẩm.</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">Đang đi làm cần bổ sung, chuẩn hóa kiến thức, tăng khả năng hoàn thiện và thăng tiến trong nghề nghiệp</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">Sinh viên chuyên ngành marketing, truyền thông, mỹ thuật, thiết đồ họa, thời trang, họa viên… cần kỹ năng sử dụng thành thạo phần mềm illustrator để&nbsp;phục vụ cho công việc và&nbsp;học thiết kế...</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">Đang&nbsp;làm việc trong lĩnh vực marketing, truyền thông, kinh doanh,…</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">Và bất cứ ai yêu thích công việc sáng tạo và thiết kế với phần mềm Adobe Illustrator!</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">Hãy tham gia ngay khóa học&nbsp;"Cẩm nang A-Z Illustrator cho Designer"&nbsp;tại Unica!</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">&nbsp;&nbsp;✔️ Khóa học do giảng viên Phạm Đức Huy trực tiếp hướng dẫn. Khóa học sẽ giúp bạn có được những kiến thức và kỹ năng nền tảng nhất để các bạn tiến gần hơn và&nbsp;trở thành một Graphic Designer, Web Designer, Game UI UX Designer hoặc Motion Graphic Designer ngay tại nhà!</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">&nbsp;&nbsp;✔️ Khóa học là nền tảng để các bạn hiểu sâu hơn về bản chất công cụ của phần mềm Adobe Illustrator, từ đó các bạn dễ dàng xin được việc tại các công ty thiết kế lớn ở Việt Nam.</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">&nbsp;&nbsp;✔️ Khóa học được soạn từ những dự án thực tế với nhiều khách hàng, vì vậy tính ứng dụng của khóa học luôn gắn liền với thị trường hiện tại. Học viên có thể ứng dụng ngay những kiến thức và kỹ năng mình học được vào trong công việc hiện tại của bản thân.</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">Nội dung khóa học cụ thể:</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">Phần 1: Giới thiệu và hướng dẫn tạo các hình khối</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">Phần 2: Các tính năng của Shapes và bài tập thực hành</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">Phần 3: Hướng dẫn các công cụ Drawing Tools, Pen Tool và Brushes</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">Phần 4: Hướng dẫn các công cụ nâng cao trong thiết kế đồ họa</span></p><p><span style="background-color: rgb(253, 253, 253); color: rgb(10, 10, 10);">Trở thành nhà thiết kế chuyên nghiệp với phần mềm Ai ngay hôm nay với&nbsp;khóa học&nbsp;"Cẩm nang A-Z Illustrator cho Designer"&nbsp;tại EduHub thôi nào!</span></p>	Để tham gia khóa học này, bạn cần: 1. Có kiến thức về sử dụng máy tính.  2. Là sinh viên CNTT có nguyện vọng tìm hiểu về Devops	Thành thạo các kĩ năng Devops cơ bản,Biết triển khai mọi dự án phần mềm	Chào mừng bạn đã đến với khóa học.		http://file.pdf	0	https://facebook.com.vn	https://course.com.vn	devops,cicd,beginer	f	\N	\N	PUBLISHED	0	0	0
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
\.


--
-- Data for Name: enrollments; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.enrollments (enrolled_date, status, completion_percentage, completion_date, student_id, course_id) FROM stdin;
2024-12-12	active	0	\N	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	95eabf10-5a9a-45db-ab13-9c37c390b4c2
\.


--
-- Data for Name: lecturers; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.lecturers (create_at, update_at, create_by, update_by, delete_at, id, name, email, phone_number, address, bio, password, role_id, email_verified, is_approved, avatar, short_description, example_video, social_link, teaching_topic, teaching_experience) FROM stdin;
2024-10-02 09:39:02.070417	2024-10-17 09:08:04.551018	\N	aaf13906-fdd4-44d5-b370-124ee8685e6a	\N	54d7b28e-0444-4ed4-8973-e5a2d9abb692	Nguyễn Văn Giảng Viên	lecturer@gmail.com	+84933516434	UIT	Tôi là giảng viên ở UIT	$2b$10$b0gWyT4JavGHYXsd9BGe1e.GLBPlafKMcstv0Z6bFQLLSUZr9GFyG	LECTURER	f	t	\N	\N	\N	\N	\N	\N
2024-12-11 08:15:28.102736	2024-12-11 08:15:28.102736	\N	\N	\N	eddc5ea9-453f-45a1-b83e-4b67d2bc5115	Nguyễn Văn Giảng Viên	chabu3364@gmail.com	+84933516439	UIT	Tôi là giảng viên ở UIT	$2b$10$Ojyq5XentjlW/TJt1QSQpuwHbiIYZpD5KPF.MsPIZfKEC/zOHzEae	LECTURER	f	f	\N	\N	https://www.youtube.com/watch?v=MGhw6XliFgo&list=PL_-VfJajZj0U1MSx1IMu13oLJq2nM97ac&ab_channel=F8Official	https://www.facebook.com/nhdhieuu	Lập trình Web	30 năm làm giảng viên tại trung tâm
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
44fc4c53-8a2c-4cce-97a5-3e006f1ca3f0	2	Phần 2	95eabf10-5a9a-45db-ab13-9c37c390b4c2
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
2024-12-07 16:34:04.589921	2024-12-07 16:34:04.589921	\N	\N	\N	50811bf0-b1aa-4093-9fe9-7c8c848a21a1	Trong bài này chúng ta sẽ tìm hiểu về toán tử gán và toán tử số học trong C++.	Toán tử gán và toán tử số học trong C++	10.0	1	https://csairs.website/media/eduhub-video/TEST_08		ec330914-c774-475d-8e19-10e113b9a09a	Toán tử gán và toán tử số học trong C++	f
2024-10-27 09:36:12.893532	2024-10-27 09:36:12.893532	\N	\N	\N	dca3bd40-9730-46b2-8f21-9478e916f198	Ở chương này chúng ta sẽ giới thiệu và làm quen cách chúng ta sẽ học	Bài 1. NodeJS là gì? Giới thiệu sơ về khóa học	15.0	1	https://csairs.website/media/eduhub-video/efefbba7-a081-4ab2-9903-dafe420aee46	http://tailieu.pdf	\N	\N	f
2024-11-30 10:33:30.208456	2024-12-02 14:54:32.803699	\N	\N	\N	4d9dd7bd-5706-4110-92e1-ceca6d0808af	designer223	designer23	3.0	4	https://csairs.website/media/eduhub-video/efefbba7-a081-4ab2-9903-dafe420aee46	\N	\N	designer3333	f
2024-11-15 09:12:39.831143	2024-12-12 08:03:14.61443	\N	\N	\N	59faae67-3257-4987-b60e-af3cd5cbb0fc	Trong bài này chúng ta sẽ thực hiện cài đặt Ubuntu server 20.04 lên KVM	Cài đặt Ubuntu lên máy ảo	3.0	1	https://csairs.website/media/eduhub-video/efefbba7-a081-4ab2-9903-dafe420aee46	https://linux-kvm.org/page/Main_Page,https://releases.ubuntu.com/focal/	a09b2806-0ba2-48ff-ad28-0b9816bc791d	Giới thiệu tổng quan về Linux	t
2024-12-03 05:47:54.970409	2024-12-08 04:10:49.116209	\N	\N	\N	416d6d9a-1823-4852-bd97-1d51f36518d4	Câu lệnh Linux cơ bản	Bài 2: Câu lệnh Linux cơ bản	3.0	2	https://csairs.website/media/eduhub-video/005a2c5e-3b70-4242-8fd8-a8561cfdcf5f	\N	a09b2806-0ba2-48ff-ad28-0b9816bc791d	Bạn có biết:\nKhóa học "Cẩm nang A-Z Illustrator cho Designer" chính là dành cho bạn, người...\nĐam mê yêu thích đồ họa, nhiếp ảnh, thiết kế sản phẩm.\nĐang đi làm cần bổ sung, chuẩn hóa kiến thức, tăng khả năng hoàn thiện và thăng tiến trong nghề nghiệp\nSinh viên chuyên ngành marketing, truyền thông, mỹ thuật, thiết đồ họa, thời trang, họa viên… cần kỹ năng sử dụng thành thạo phần mềm illustrator để  phục vụ cho công việc và học thiết kế...\nĐang làm việc trong lĩnh vực marketing, truyền thông, kinh doanh,…\nVà bất cứ ai yêu thích công việc sáng tạo và thiết kế với phần mềm Adobe Illustrator!\nHãy tham gia ngay khóa học "Cẩm nang A-Z Illustrator cho Designer" tại Unica!\n   ✔️ Khóa học do giảng viên Phạm Đức Huy trực tiếp hướng dẫn. Khóa học sẽ giúp bạn có được những kiến thức và kỹ năng nền tảng nhất để các bạn tiến gần hơn và trở thành một Graphic Designer, Web Designer, Game UI UX Designer hoặc Motion Graphic Designer ngay tại nhà!\n   ✔️ Khóa học là nền tảng để các bạn hiểu sâu hơn về bản chất công cụ của phần mềm Adobe Illustrator, từ đó các bạn dễ dàng xin được việc tại các công ty thiết kế lớn ở Việt Nam.\n   ✔️ Khóa học được soạn từ những dự án thực tế với nhiều khách hàng, vì vậy tính ứng dụng của khóa học luôn gắn liền với thị trường hiện tại. Học viên có thể ứng dụng ngay những kiến thức và kỹ năng mình học được vào trong công việc hiện tại của bản thân.\nNội dung khóa học cụ thể:\nPhần 1: Giới thiệu và hướng dẫn tạo các hình khối\nPhần 2: Các tính năng của Shapes và bài tập thực hành\nPhần 3: Hướng dẫn các công cụ Drawing Tools, Pen Tool và Brushes\nPhần 4: Hướng dẫn các công cụ nâng cao trong thiết kế đồ họa\nTrở thành nhà thiết kế chuyên nghiệp với phần mềm Ai ngay hôm nay với khóa học "Cẩm nang A-Z Illustrator cho Designer" tại EduHub thôi nào!	f
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
2024-12-08 04:08:38.006121	2024-12-08 04:08:50.993612	\N	\N	\N	1b18eba8-e949-4369-b1c9-348cfb393c8d	test	S	S	D	S	1	sad	C	a09b2806-0ba2-48ff-ad28-0b9816bc791d
2024-11-30 16:34:25.328586	2024-12-02 14:54:32.803699	\N	\N	\N	e3fa45e3-2864-4751-a568-2a80fdb51aa8	temp-GGyqJx9EhNi9urdhGb47t222	2	2	2	A	2	22222	A,C	\N
2024-12-01 00:48:11.610281	2024-12-02 14:54:32.803699	\N	\N	\N	e6f10cab-4bfb-4d65-a9b8-02d779d3a685	temp-bsQIucr1ZFEs1ufNIJI8a	\N	\N	\N	\N	3	\N		\N
2024-12-01 00:58:43.293083	2024-12-02 14:54:32.803699	\N	\N	\N	beeaca1e-007b-4b3b-8b30-0560c290239f	temp-tNUEvSSbXk_n2g_jzGwAB	\N	\N	\N	\N	4	\N		\N
2024-12-01 01:00:49.811439	2024-12-02 14:54:32.803699	\N	\N	\N	2dd47882-0e89-4455-bb7c-28d10a5779c4	temp-XOi1m0-pDSUOpDXFM86qa	\N	\N	\N	\N	5	\N		\N
2024-12-01 01:12:00.352562	2024-12-02 14:54:32.803699	\N	\N	\N	d8167f32-0cea-4f3e-a7d1-2a1f80c64074	temp-57otk2ICQ0kKkEv4iwG1T	\N	\N	\N	\N	6	\N		\N
2024-12-01 05:32:36.217435	2024-12-02 14:54:32.803699	\N	\N	\N	f6fc7535-abbf-40ba-8cab-3049f140a46d	temp-1z1yM4LW4dcQA-hUyZ7ZK	\N	\N	\N	\N	7	\N		\N
2024-12-05 09:43:54.306458	2024-12-05 09:44:35.124662	\N	\N	\N	a722de9f-bcb3-4acc-b424-6f9659e866b3	temp-PHWEc0QcqGdWlUkrVDduV	\N	\N	\N	\N	3	\N		\N
2024-12-05 09:43:53.200488	2024-12-05 11:28:11.538421	\N	\N	\N	ccda6cdc-5035-4311-884a-567f6290c023	Test 2	Dung	Sai	Dung	Sai	2	test	C,A	\N
2024-12-05 09:44:36.249383	2024-12-05 11:28:13.507211	\N	\N	\N	6cbf2d92-0468-4596-afbb-16c3271a167b	Test 3	Sai	Dung	Sai	Sai	2	test	B	\N
2024-11-15 09:12:39.831143	2024-12-05 11:28:15.726819	\N	\N	\N	b233d9f0-5872-4723-b086-d5f43956d7e0	Tại sao trong khóa học này lại dùng Ubuntu bản 20.04 mà không phải bản mới hơn là 24.04 ?	Vì bản mới thiếu ổn định	Vì bản mới nhiều lỗi	Vì giảng viên thích thế	Vì bản 20.04 miễn phí còn bản 24.04 mất phí	1	\N	A,B	\N
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
59faae67-3257-4987-b60e-af3cd5cbb0fc	488a5b1b-1f64-4c8e-8a54-641e75973503	2024-12-08 11:34:53.762	30	f	\N
e35dda2c-6f3b-416b-8aed-73d5a38b4dec	488a5b1b-1f64-4c8e-8a54-641e75973503	2024-12-08 11:35:46.987	20	f	\N
59faae67-3257-4987-b60e-af3cd5cbb0fc	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	2024-12-03 20:32:21.037	50	f	2024-12-03 20:50:20
416d6d9a-1823-4852-bd97-1d51f36518d4	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	2024-12-11 07:03:09.214	50	f	\N
96cb98b0-8eab-4bae-bb35-f83a713c741f	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	2024-12-12 14:59:34.677	86	f	\N
e18cd519-5ec9-4d77-af84-2ee8bdfcb62c	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	2024-12-12 15:16:25.861	11	f	\N
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
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.students (create_at, update_at, create_by, update_by, delete_at, id, name, email, phone_number, password, role_id, google_id, facebook_id, avatar) FROM stdin;
2024-10-11 10:06:40.052492	2024-10-11 10:06:40.052492	\N	\N	\N	b06e0563-e53b-4f15-8283-9212bdc2c7bd	Thịnh Phú	haphuthinh332004@gmail.com	\N	$2b$10$sWSyuYeBirwnMXNZodmzLel2ezw4gGy9tJrvmrG1Qtk5PnMLTBe.W	STUDENT	104488863102429832140	\N	https://lh3.googleusercontent.com/a/ACg8ocKw_sM4WXW5oE3wJqAlTxcHaBfsB_GZ-rw8lZdzKxivyZOIvadB=s96-c
2024-10-15 04:07:21.143056	2024-10-15 04:07:21.143056	\N	\N	\N	997a2a0a-8545-46cd-aec5-b0c60355f281	Thịnh Hà Phú	22521405@gm.uit.edu.vn	\N	$2b$10$KfqTG9QTaAP29PXQlfZzI.UCvtzch9sWdybxxDSza3lFVGUBzjwX.	STUDENT	109748593329838623697	\N	https://lh3.googleusercontent.com/a/ACg8ocJHiAU1G7og7McnS0Bkiud6BENJz4Gb7mSqnI0MLHd-60UzIA=s96-c
2024-10-27 11:39:45.528604	2024-10-27 11:39:45.528604	\N	\N	\N	ecee3fc7-cb13-4023-9c90-74b906501386	Trần Hoàng	tranhoang332004@gmail.com	\N	$2b$10$2S6rj1ePQiY9F4/EIPWmKemMMrk4uwGh0NERs0dZxWVnPOmM/9woS	STUDENT	112863371347720345296	\N	https://lh3.googleusercontent.com/a/ACg8ocLAo5ga6Q3bQQ65_tsJsK49VWHdxvc-gEzYbnIZZJqvVvFaSA=s96-c
2024-10-31 09:30:53.931054	2024-10-31 09:30:53.931054	\N	\N	\N	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	Thịnh Hà	chabu332004@gmail.com	\N	$2b$10$NRJDuUfi.5Wk4LNFAPr/huMuHAcKeM7vMy5pBCmueb6r5Idx8PNRy	STUDENT	\N	\N	\N
2024-10-15 04:06:04.581496	2024-10-15 04:06:04.581496	\N	\N	\N	d0c85e17-7f35-440a-bfb1-7472624287a1	Cha Bu	haphuthinh3362@gmail.com	\N	$2b$10$yx0tC4BAJ2gObmoE0J23jOqmsXEyiymPyNU4tizUCmIQ3ZHimxQeS	STUDENT	113771013742446745583	\N	https://lh3.googleusercontent.com/a/ACg8ocLs6hJIeXWPl7lqLzEgEwUmRI4CiMt1vCrDQBhm29B2k801o0mNOg=s96-c
2024-10-31 12:40:43.286089	2024-10-31 12:40:43.286089	\N	\N	\N	3a69a0c9-a7de-4f93-9a6d-0410e38af0b7	Hà Phú Thịnh	haphuthinh3364@gmail.com	\N	$2b$10$Hc0U4Tz499VYmNcvgCCnVufLgYE..pL.LIX64itfBdYetpvhoq7Yq	STUDENT	\N	1736203403883169	https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1736203403883169&height=50&width=50&ext=1732970442&hash=Abbto8TMqniOGHV40fZd2U1b
2024-10-31 13:34:20.181686	2024-10-31 13:34:20.181686	\N	\N	\N	488a5b1b-1f64-4c8e-8a54-641e75973503	Cha Bu	\N	+84868042952	$2b$10$1rZA7FJmNEH.u7RO258wZutOdgbM5ZGJHmoZX14vNPvftTfdeknUG	STUDENT	\N	\N	\N
2024-11-07 11:18:17.567769	2024-11-07 11:18:17.567769	\N	\N	\N	259cb49b-7584-466c-80ee-34548d95cb20	Nguyen Sang	lc23ar@gmail.com	\N	$2b$10$kwXAa.KpLqSYLlMNNqqlrO5LtViTT4./6UJ8Gs6wLKLnRdMuxtri2	STUDENT	\N	\N	\N
2024-11-07 11:18:25.510665	2024-11-07 11:18:25.510665	\N	\N	\N	44badb88-ab1b-470b-920a-bd951dc71cff	Nguyen Sang	lc23ar@gmail.com	\N	$2b$10$kwXAa.KpLqSYLlMNNqqlrO5LtViTT4./6UJ8Gs6wLKLnRdMuxtri2	STUDENT	\N	\N	\N
2024-11-08 14:41:07.497738	2024-11-08 14:41:07.497738	\N	\N	\N	69929ffb-c9f6-4a76-8e20-c6ff90162fbf	Thien Ha	thienha89f@gmail.com	\N	$2b$10$fUpTxiuWZOBu2juUmaF2eOJJ0Du1MUSmr7wb6Yy2K8iWGrN3d/E/a	STUDENT	105236472986757553636	\N	https://lh3.googleusercontent.com/a/ACg8ocJmeb2GOahvMOuLe6wmMsaUEQUbAIrs-r66JPPldvP4haQzww=s96-c
2024-10-31 09:33:41.286503	2024-11-15 01:42:30.121303	\N	\N	\N	930c9500-c247-4f18-95dd-f0f54bc2e3ec	Cha Bu	\N	+84933516434	$2b$10$.RgnCsOmJBDlao8f6MQuye0M3S16CrBslfjXOHczfh2Q9uF5xKEke	STUDENT	\N	\N	\N
2024-11-01 14:44:19.937507	2024-11-15 05:31:55.537178	\N	\N	\N	543bdbdf-5361-4eac-9094-49ba9182d034	Thanh Sang	20521833@gm.uit.edu.vn	\N	$2b$10$MYGz1oJv2fMBnD/5fORtyOAH4i7dF/T3nBPi.3/UfW45bsR.Xx0sS	STUDENT	\N	\N	\N
2024-11-16 09:41:40.385076	2024-11-16 09:41:40.385076	\N	\N	\N	09aa11c1-d922-4e8a-8427-c9f4c36138c0	Phan Khoa	tuankhoaanh2104@gmail.com	\N	$2b$10$bFIZB4mYSqDZpicWMTpmq.45OKifVa6YhNiR73aHgWXqICu52MMri	STUDENT	\N	\N	\N
2024-11-11 04:43:23.7794	2024-12-12 05:48:46.182293	\N	\N	\N	740034a9-1e8a-4b0d-a8e8-549914b6dd21	Thanh Sang Nguyễn	nguyenthanhsang22vn@gmail.com	\N	$2b$10$oLrViRcSfzbCTLUChsIVsuF8akITBbqTYQDMqm9bQiVt10mjqADwK	STUDENT	110291808970448874122	\N	https://lh3.googleusercontent.com/a/ACg8ocJyWJKLOPLwDEZvvYjpvgST8iaYfk8DtAFbc0qhq-KbzSrJKUA=s96-c
\.


--
-- Data for Name: test; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.test  FROM stdin;
\.


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev_account
--

SELECT pg_catalog.setval('public.migrations_id_seq', 37, true);


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

