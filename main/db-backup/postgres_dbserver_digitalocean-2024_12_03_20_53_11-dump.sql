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
    role_id character varying
);


ALTER TABLE public.employees OWNER TO dev_account;

--
-- Name: enrollments; Type: TABLE; Schema: public; Owner: dev_account
--

CREATE TABLE public.enrollments (
    "studentId" character varying NOT NULL,
    "courseId" character varying NOT NULL,
    "enrolledDate" date NOT NULL,
    status public.enrollments_status_enum NOT NULL,
    completion_percentage integer NOT NULL,
    completion_date date,
    student_id uuid,
    course_id uuid
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
    is_approved boolean DEFAULT false NOT NULL
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
    student_id uuid NOT NULL
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
    create_at timestamp without time zone NOT NULL
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
2024-12-02 14:55:28.46418	2024-12-02 14:55:28.46418	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	0f855ee9-6346-4e99-ae5a-8f9db7626172	Lập trình Java Spring Boot Backend cho người mới bắt đầu	https://example.com/image.png	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	This is a beginner level course for Spring Boot Developer.	Khóa học dành cho người mới bắt đầu	Ai có thể tham gia khóa học này: 1. Sinh viên IT đã từng tiếp xúc với lập trình. 2. Lập trình viên đang quan tâm tới Java Spring Boot	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-02 15:01:03.580875	2024-12-02 15:01:03.580875	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	9c05c92e-45e3-4e4d-b4ac-f5f4c0ea5c99	Lập trình Java Spring Boot Backend cho người mới bắt đầu	https://example.com/image.png	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	This is a beginner level course for Spring Boot Developer.	Khóa học dành cho người mới bắt đầu	Ai có thể tham gia khóa học này: 1. Sinh viên IT đã từng tiếp xúc với lập trình. 2. Lập trình viên đang quan tâm tới Java Spring Boot	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-02 14:18:55.5149	2024-12-02 14:18:55.5149	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	4842e41d-9f78-4e40-b359-0ab6c4a6382a	Lập trình Java Spring Boot Backend cho người mới bắt đầu	https://example.com/image.png	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	This is a beginner level course for Spring Boot Developer.	Khóa học dành cho người mới bắt đầu	Ai có thể tham gia khóa học này: 1. Sinh viên IT đã từng tiếp xúc với lập trình. 2. Lập trình viên đang quan tâm tới Java Spring Boot	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-02 15:05:35.888067	2024-12-02 15:05:35.888067	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	a180ec7d-73d9-453d-9dfc-e18400b9efd9	Lập trình Java Spring Boot Backend cho người mới bắt đầu	https://example.com/image.png	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	This is a beginner level course for Spring Boot Developer.	Khóa học dành cho người mới bắt đầu	Ai có thể tham gia khóa học này: 1. Sinh viên IT đã từng tiếp xúc với lập trình. 2. Lập trình viên đang quan tâm tới Java Spring Boot	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-02 14:44:48.653094	2024-12-02 14:44:48.653094	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	a805c136-ba5a-47bf-a1b8-519a1104414f	Lập trình Java Spring Boot Backend cho người mới bắt đầu	https://example.com/image.png	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	This is a beginner level course for Spring Boot Developer.	Khóa học dành cho người mới bắt đầu	Ai có thể tham gia khóa học này: 1. Sinh viên IT đã từng tiếp xúc với lập trình. 2. Lập trình viên đang quan tâm tới Java Spring Boot	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-12-02 14:50:46.175224	2024-12-02 14:50:46.175224	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	66c93332-3e00-44bf-b8a7-853549b30aa7	Lập trình Java Spring Boot Backend cho người mới bắt đầu	https://example.com/image.png	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	This is a beginner level course for Spring Boot Developer.	Khóa học dành cho người mới bắt đầu	Ai có thể tham gia khóa học này: 1. Sinh viên IT đã từng tiếp xúc với lập trình. 2. Lập trình viên đang quan tâm tới Java Spring Boot	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-10-27 09:36:12.893532	2024-11-19 09:59:20.495153	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	322d11e5-54b4-40ad-bdf2-d2a9fdb3a408	Lập trình NodeJS Backend cho người mới bắt đầu	https://example.com/image.png	10.5	easy	2024-01-01	2024-02-01	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	t	\N	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-11-15 03:06:50.5221	2024-11-19 10:01:32.051709	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	4ee424a6-48c3-4f84-b89a-119a51557c92	Lập trình Java Spring Boot Backend cho người mới bắt đầu	https://example.com/image.png	0.0	easy	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
2024-10-09 02:51:37.442064	2024-12-02 15:27:47.11076	\N	\N	\N	95eabf10-5a9a-45db-ab13-9c37c390b4c2	Devops cho người mới bắt đầu	\N	20.0	medium	\N	\N	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	t	Devops for fresher	100000	120000	Khóa học Devops cho người mới bắt đầu. Tất tần tật mọi thứ từ Linux, Docker, CI/CD, K8S, Cloud,...	Dành riêng cho người muốn tìm hiểu về Devops nhưng chưa biết bắt dầu từ đâu!	Để tham gia khóa học này, bạn cần: 1. Có kiến thức về sử dụng máy tính.  2. Là sinh viên CNTT có nguyện vọng tìm hiểu về Devops	Thành thạo các kĩ năng Devops cơ bản,Biết triển khai mọi dự án phần mềm	Chào mừng bạn đã đến với khóa học.		http://file.pdf	0	https://facebook.com.vn	https://course.com.vn	devops,cicd,beginer	f	\N	\N	PUBLISHED	0	0	0
2024-10-27 09:15:41.775035	2024-11-19 15:46:03.618313	54d7b28e-0444-4ed4-8973-e5a2d9abb692	\N	\N	469d5513-81d6-43c8-ae81-edbd778966be	Lập trình Golang Backend cho người mới bắt đầu	https://example.com/image.png	10.5	easy	2024-01-01	2024-02-01	295debd3-b85b-43c4-a00e-26eed191c305	54d7b28e-0444-4ed4-8973-e5a2d9abb692	f	\N	0	0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	WAITING_FOR_APPROVAL	0	0	0
\.


--
-- Data for Name: discounts; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.discounts (create_at, update_at, create_by, update_by, delete_at, id, code, discount_amount, discount_percentage, start_date, end_date, course_id, "courseId") FROM stdin;
\.


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.employees (create_at, update_at, create_by, update_by, delete_at, id, name, email, phone_number, password, role_id) FROM stdin;
2024-10-02 07:03:15.756415	2024-10-02 07:03:15.756415	\N	\N	\N	aaf13906-fdd4-44d5-b370-124ee8685e6a	Nguyễn Văn Management Admin	management_admin@gmail.com	0909123456	$2a$04$NSKvCk5gb7MCtvBLKzFfAuB3PXMTLv7fu2PDcStnJJCpHqTPW1.HS	MANAGEMENT_ADMIN
2024-10-09 15:20:16.446367	2024-10-09 15:20:16.446367	\N	\N	\N	86ba7e9e-aa90-481e-bf52-c17c537a5357	Nguyễn Văn Kế Toán	accountant1@gmail.com	+84912345679	$2b$10$orwle8rh0JQYMZyHoNU/ke7nuKJQWNwDMRD7B/zoYIksnc2J0eHMK	ACCOUNTANT
2024-10-11 13:13:17.596315	2024-10-11 13:13:17.596315	\N	\N	\N	26f084e9-ca73-4054-a563-0b6e225de3ec	Nguyễn Văn Kế Toán 2	accountant2@gmail.com	+84912345677	$2b$10$DyuJihwbEHv3.iN9klNAmekqLza75J1HMMYhnUEhETNrtpN.yog2e	ACCOUNTANT
2024-10-11 15:58:24.708184	2024-10-11 15:58:24.708184	\N	\N	\N	7ec639ba-3faf-4f39-93ab-c694b52c73c0		accountant3@gmail.com	+84912345676	$2b$10$.cx5xs8TJpCtAwg2Nfvzr.CJzPA.XZNuNstjYj6kUY1CoEYQ.JZs.	ACCOUNTANT
2024-10-02 08:13:04.736419	2024-10-16 15:50:39.959848	\N	\N	\N	2f6f1e80-9079-4ed3-9df0-e1d21e629724	Nguyễn Văn Kế Toán	accountant@gmail.com	+84912345678	accountant	ACCOUNTANT
\.


--
-- Data for Name: enrollments; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.enrollments ("studentId", "courseId", "enrolledDate", status, completion_percentage, completion_date, student_id, course_id) FROM stdin;
\.


--
-- Data for Name: lecturers; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.lecturers (create_at, update_at, create_by, update_by, delete_at, id, name, email, phone_number, address, bio, password, role_id, email_verified, is_approved) FROM stdin;
2024-10-02 09:39:02.070417	2024-10-17 09:08:04.551018	\N	aaf13906-fdd4-44d5-b370-124ee8685e6a	\N	54d7b28e-0444-4ed4-8973-e5a2d9abb692	Nguyễn Văn Giảng Viên	lecturer@gmail.com	+84933516434	UIT	Tôi là giảng viên ở UIT	$2b$10$b0gWyT4JavGHYXsd9BGe1e.GLBPlafKMcstv0Z6bFQLLSUZr9GFyG	LECTURER	f	t
\.


--
-- Data for Name: lesson_parts; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.lesson_parts (id, part_no, part_name, course_id) FROM stdin;
bd7ba758-23d9-471c-a534-9757946681cd	1	Phần 1. Tổng quan về Linux	\N
5b1a2c8f-68ef-4539-91ab-7240b5fb1ad1	1	Phần 1. Tổng quan về Linux	\N
a09b2806-0ba2-48ff-ad28-0b9816bc791d	1	Phần 1. Tổng quan về Linux	95eabf10-5a9a-45db-ab13-9c37c390b4c2
e456c6e6-a990-46ea-8e43-9e84da2f758a	2	Phần 2. Giới thiệu Docker test	\N
\.


--
-- Data for Name: lessons; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.lessons (create_at, update_at, create_by, update_by, delete_at, id, description, title, duration, "order", video_url, resource_link, lesson_part_id, introduction, is_free_trial) FROM stdin;
2024-10-27 09:36:12.893532	2024-10-27 09:36:12.893532	\N	\N	\N	dca3bd40-9730-46b2-8f21-9478e916f198	Ở chương này chúng ta sẽ giới thiệu và làm quen cách chúng ta sẽ học	Bài 1. NodeJS là gì? Giới thiệu sơ về khóa học	15.0	1	http://159.223.56.195/media/eduhub-video/efefbba7-a081-4ab2-9903-dafe420aee46	http://tailieu.pdf	\N	\N	f
2024-11-15 08:41:22.636917	2024-11-15 08:41:22.636917	\N	\N	\N	e35dda2c-6f3b-416b-8aed-73d5a38b4dec	Trong bài này chúng ta sẽ thực hiện cài đặt Ubuntu server 20.04 lên KVM	Cài đặt Ubuntu lên máy ảo	20.0	1		https://linux-kvm.org/page/Main_Page,https://releases.ubuntu.com/focal/	bd7ba758-23d9-471c-a534-9757946681cd	\N	f
2024-11-15 09:10:45.067173	2024-11-15 09:10:45.067173	\N	\N	\N	376e362c-43c5-4ee6-94a0-3ebd189f5bb1	Trong bài này chúng ta sẽ thực hiện cài đặt Ubuntu server 20.04 lên KVM	Cài đặt Ubuntu lên máy ảo	20.0	1		https://linux-kvm.org/page/Main_Page,https://releases.ubuntu.com/focal/	5b1a2c8f-68ef-4539-91ab-7240b5fb1ad1	\N	f
2024-11-19 07:12:29.589675	2024-12-02 14:54:32.803699	\N	\N	\N	d58a26c4-ac47-4aa4-828d-5a9a8969626b	Trong bài này chúng ta sẽ thực hiện sử dụng các câu lệnh Linux cơ bản	Các lệnh linux cơ bản	50.0	1		https://linux-kvm.org/page/Main_Page,https://releases.ubuntu.com/focal/	\N	Giới thiệu tổng quan về Linux	t
2024-11-30 09:52:32.129154	2024-12-02 14:54:32.803699	\N	\N	\N	3ab17f6e-4b4e-43dc-9c64-6a4f2434ae2a	new lesson	new lesson	3.0	2	\N	\N	\N	new lesson	t
2024-11-30 09:48:27.596245	2024-12-02 14:54:32.803699	\N	\N	\N	da3a1e6e-d562-4a08-bc05-31bb9d7638ce	test lesson2	test lesson22	3.0	3	\N	\N	\N	test lesson	t
2024-11-19 07:18:07.873386	2024-11-19 07:22:56.626163	\N	\N	\N	ed5e671c-3aa1-4146-b1f7-a57e83e9edf1	Trong bài này chúng ta sẽ thực hiện sử dụng các câu lệnh Linux cơ bản	Các lệnh linux cơ bản	20.0	3		https://linux-kvm.org/page/Main_Page,https://releases.ubuntu.com/focal/	\N	Giới thiệu tổng quan về Linux	t
2024-11-30 10:33:30.208456	2024-12-02 14:54:32.803699	\N	\N	\N	4d9dd7bd-5706-4110-92e1-ceca6d0808af	designer223	designer23	3.0	4	http://159.223.56.195/media/eduhub-image/36d5db93-8bb3-4b01-9186-cf339e23741e	\N	\N	designer3333	f
2024-11-19 07:23:54.490863	2024-11-24 06:58:25.169901	\N	\N	\N	0c25fa86-2351-44a2-9a64-2836c9014fc2	Cài đặt linux	Cài đặt linux vào máy ảo	20.0	2		https://linux-kvm.org/page/Main_Page,https://releases.ubuntu.com/focal/	\N	Giới thiệu tổng quan về Linux	f
2024-11-24 06:58:25.169901	2024-11-30 08:36:31.211795	\N	\N	\N	3b5f098d-0957-40af-bcf1-7ef00d3f5fcb	Trong bài này chúng ta sẽ thực hiện tìm hiểu về Docker và cài đặt	Docker là gì? Cách cài đặt	6.0	1		https://linux-kvm.org/page/Main_Page,https://releases.ubuntu.com/focal/	e456c6e6-a990-46ea-8e43-9e84da2f758a	Giới thiệu về Docker	t
2024-11-24 06:58:25.169901	2024-11-30 08:36:31.211795	\N	\N	\N	ed3b876d-b1c1-4895-af58-b08c44b6948a	Trong bài này chúng ta sẽ thực hiện docker hóa một application đơn giản	Docker hóa NodeJS	30.0	2		https://linux-kvm.org/page/Main_Page,https://releases.ubuntu.com/focal/	e456c6e6-a990-46ea-8e43-9e84da2f758a	Docker hóa một application bất kì	f
2024-11-15 09:12:39.831143	2024-12-02 15:27:47.11076	\N	\N	\N	59faae67-3257-4987-b60e-af3cd5cbb0fc	Trong bài này chúng ta sẽ thực hiện cài đặt Ubuntu server 20.04 lên KVM	Cài đặt Ubuntu lên máy ảo	20.0	2		https://linux-kvm.org/page/Main_Page,https://releases.ubuntu.com/focal/	a09b2806-0ba2-48ff-ad28-0b9816bc791d	Giới thiệu tổng quan về Linux	t
2024-11-30 10:31:00.708066	2024-11-30 14:20:49.691796	\N	\N	\N	38b2d166-a32d-4fde-ad4e-dbfb4fc41b87	uiux	uiux	3.0	3	http://159.223.56.195/media/eduhub-image/05063581-592e-4d62-82ee-c9e7d8f2ae8d	\N	\N	uiux	t
2024-12-03 05:47:54.970409	2024-12-03 05:47:54.970409	\N	\N	\N	416d6d9a-1823-4852-bd97-1d51f36518d4	Câu lệnh Linux cơ bản	Bài 2: Câu lệnh Linux cơ bản	3.0	2	http://159.223.56.195/media/eduhub-image/e10cf1dd-1abc-4071-8714-9d61f5d20df0	\N	a09b2806-0ba2-48ff-ad28-0b9816bc791d	Bạn có biết:\nKhóa học "Cẩm nang A-Z Illustrator cho Designer" chính là dành cho bạn, người...\nĐam mê yêu thích đồ họa, nhiếp ảnh, thiết kế sản phẩm.\nĐang đi làm cần bổ sung, chuẩn hóa kiến thức, tăng khả năng hoàn thiện và thăng tiến trong nghề nghiệp\nSinh viên chuyên ngành marketing, truyền thông, mỹ thuật, thiết đồ họa, thời trang, họa viên… cần kỹ năng sử dụng thành thạo phần mềm illustrator để  phục vụ cho công việc và học thiết kế...\nĐang làm việc trong lĩnh vực marketing, truyền thông, kinh doanh,…\nVà bất cứ ai yêu thích công việc sáng tạo và thiết kế với phần mềm Adobe Illustrator!\nHãy tham gia ngay khóa học "Cẩm nang A-Z Illustrator cho Designer" tại Unica!\n   ✔️ Khóa học do giảng viên Phạm Đức Huy trực tiếp hướng dẫn. Khóa học sẽ giúp bạn có được những kiến thức và kỹ năng nền tảng nhất để các bạn tiến gần hơn và trở thành một Graphic Designer, Web Designer, Game UI UX Designer hoặc Motion Graphic Designer ngay tại nhà!\n   ✔️ Khóa học là nền tảng để các bạn hiểu sâu hơn về bản chất công cụ của phần mềm Adobe Illustrator, từ đó các bạn dễ dàng xin được việc tại các công ty thiết kế lớn ở Việt Nam.\n   ✔️ Khóa học được soạn từ những dự án thực tế với nhiều khách hàng, vì vậy tính ứng dụng của khóa học luôn gắn liền với thị trường hiện tại. Học viên có thể ứng dụng ngay những kiến thức và kỹ năng mình học được vào trong công việc hiện tại của bản thân.\nNội dung khóa học cụ thể:\nPhần 1: Giới thiệu và hướng dẫn tạo các hình khối\nPhần 2: Các tính năng của Shapes và bài tập thực hành\nPhần 3: Hướng dẫn các công cụ Drawing Tools, Pen Tool và Brushes\nPhần 4: Hướng dẫn các công cụ nâng cao trong thiết kế đồ họa\nTrở thành nhà thiết kế chuyên nghiệp với phần mềm Ai ngay hôm nay với khóa học "Cẩm nang A-Z Illustrator cho Designer" tại EduHub thôi nào!	f
2024-12-01 01:01:33.013467	2024-12-01 01:01:53.680374	\N	\N	\N	42390199-e59e-48bb-870c-f5d85da9854b	qưe	qưe	3.0	6	http://159.223.56.195/media/eduhub-image/dbedefe8-ccc0-4c21-b18e-b4cac349b08c	\N	\N	qưe	f
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
\.


--
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.notification (create_at, update_at, create_by, update_by, delete_at, id, content, title, "isRead", user_id, role, "notiType") FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.orders (create_at, update_at, create_by, update_by, delete_at, id, total_price, payment_id, status, student_id) FROM stdin;
2024-11-25 12:14:32.446883	2024-11-25 12:14:32.446883	\N	\N	\N	3e97fd93-c78a-46d5-bef2-129a01fd250b	120000	\N	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b
2024-11-25 12:17:56.679849	2024-11-25 12:17:56.679849	\N	\N	\N	00ee470c-5ef1-4a59-bba7-0b9bcfc2df5f	120000	c4af2582-c56c-453f-8676-cdd325920648	WAITING_FOR_PAYMENT	ea51fc33-82a2-4e55-9c86-a7a9ea73413b
\.


--
-- Data for Name: orders_items; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.orders_items (id, price, course_id, order_id, course_key) FROM stdin;
b96f8be5-6a6e-4a5b-a0de-09defa956d0c	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	3e97fd93-c78a-46d5-bef2-129a01fd250b	\N
eb356c93-b4c3-4358-9fb5-f12798c8c797	120000	95eabf10-5a9a-45db-ab13-9c37c390b4c2	00ee470c-5ef1-4a59-bba7-0b9bcfc2df5f	\N
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.payments (create_at, update_at, create_by, update_by, delete_at, id, pay_type, payment_status, amount, pay_info) FROM stdin;
2024-11-25 12:17:56.679849	2024-11-25 12:17:56.679849	\N	\N	\N	c4af2582-c56c-453f-8676-cdd325920648	VNPAY	f	120000	\N
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
2024-12-01 00:48:29.223039	2024-12-01 00:58:40.084766	\N	\N	\N	d30f7fc1-6e8a-4493-8de4-05c3a1a26b87	temp-chJas1-0x8zL4v0w3d6-r	\N	\N	\N	\N	4	\N		\N
2024-12-01 00:48:40.121739	2024-12-01 00:58:45.949618	\N	\N	\N	565a239d-75fd-4b51-ae57-89f894954372	temp-CaGO177PrLlVhqlU0zitX	\N	\N	\N	\N	4	\N		\N
2024-11-15 09:12:39.831143	2024-12-02 14:54:32.803699	\N	\N	\N	b233d9f0-5872-4723-b086-d5f43956d7e0	Tại sao trong khóa học này lại dùng Ubuntu bản 20.04 mà không phải bản mới hơn là 24.04 ?	Vì bản mới thiếu ổn định	Vì bản mới nhiều lỗi	Vì giảng viên thích thế	Vì bản 20.04 miễn phí còn bản 24.04 mất phí	2	\N	A,B	a09b2806-0ba2-48ff-ad28-0b9816bc791d
2024-11-30 16:34:25.328586	2024-12-02 14:54:32.803699	\N	\N	\N	e3fa45e3-2864-4751-a568-2a80fdb51aa8	temp-GGyqJx9EhNi9urdhGb47t222	2	2	2	A	2	22222	A,C	\N
2024-12-01 00:48:11.610281	2024-12-02 14:54:32.803699	\N	\N	\N	e6f10cab-4bfb-4d65-a9b8-02d779d3a685	temp-bsQIucr1ZFEs1ufNIJI8a	\N	\N	\N	\N	3	\N		\N
2024-12-01 00:58:43.293083	2024-12-02 14:54:32.803699	\N	\N	\N	beeaca1e-007b-4b3b-8b30-0560c290239f	temp-tNUEvSSbXk_n2g_jzGwAB	\N	\N	\N	\N	4	\N		\N
2024-12-01 01:00:49.811439	2024-12-02 14:54:32.803699	\N	\N	\N	2dd47882-0e89-4455-bb7c-28d10a5779c4	temp-XOi1m0-pDSUOpDXFM86qa	\N	\N	\N	\N	5	\N		\N
2024-12-01 01:12:00.352562	2024-12-02 14:54:32.803699	\N	\N	\N	d8167f32-0cea-4f3e-a7d1-2a1f80c64074	temp-57otk2ICQ0kKkEv4iwG1T	\N	\N	\N	\N	6	\N		\N
2024-12-01 05:32:36.217435	2024-12-02 14:54:32.803699	\N	\N	\N	f6fc7535-abbf-40ba-8cab-3049f140a46d	temp-1z1yM4LW4dcQA-hUyZ7ZK	\N	\N	\N	\N	7	\N		\N
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
59faae67-3257-4987-b60e-af3cd5cbb0fc	ea51fc33-82a2-4e55-9c86-a7a9ea73413b	2024-12-03 20:32:21.037	100	t	2024-12-03 20:50:20
\.


--
-- Data for Name: student_complete_quizzes; Type: TABLE DATA; Schema: public; Owner: dev_account
--

COPY public.student_complete_quizzes (quiz_id, student_id, create_at) FROM stdin;
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
2024-11-11 04:43:23.7794	2024-11-11 04:43:23.7794	\N	\N	\N	740034a9-1e8a-4b0d-a8e8-549914b6dd21	Thanh Sang Nguyễn	nguyenthanhsang22vn@gmail.com	\N	$2b$10$DbPgUyRPsE1Bv6zPX5x.t.eVlDK8QQmQzWhEwlD12LL9f7KhVWhCe	STUDENT	110291808970448874122	\N	https://lh3.googleusercontent.com/a/ACg8ocJyWJKLOPLwDEZvvYjpvgST8iaYfk8DtAFbc0qhq-KbzSrJKUA=s96-c
2024-10-31 09:33:41.286503	2024-11-15 01:42:30.121303	\N	\N	\N	930c9500-c247-4f18-95dd-f0f54bc2e3ec	Cha Bu	\N	+84933516434	$2b$10$.RgnCsOmJBDlao8f6MQuye0M3S16CrBslfjXOHczfh2Q9uF5xKEke	STUDENT	\N	\N	\N
2024-11-01 14:44:19.937507	2024-11-15 05:31:55.537178	\N	\N	\N	543bdbdf-5361-4eac-9094-49ba9182d034	Thanh Sang	20521833@gm.uit.edu.vn	\N	$2b$10$MYGz1oJv2fMBnD/5fORtyOAH4i7dF/T3nBPi.3/UfW45bsR.Xx0sS	STUDENT	\N	\N	\N
2024-11-16 09:41:40.385076	2024-11-16 09:41:40.385076	\N	\N	\N	09aa11c1-d922-4e8a-8427-c9f4c36138c0	Phan Khoa	tuankhoaanh2104@gmail.com	\N	$2b$10$bFIZB4mYSqDZpicWMTpmq.45OKifVa6YhNiR73aHgWXqICu52MMri	STUDENT	\N	\N	\N
\.


--
-- Data for Name: test; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.test  FROM stdin;
\.


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev_account
--

SELECT pg_catalog.setval('public.migrations_id_seq', 31, true);


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
-- Name: enrollments PK_1566a16b6323a3e3ade31a02c9b; Type: CONSTRAINT; Schema: public; Owner: dev_account
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT "PK_1566a16b6323a3e3ade31a02c9b" PRIMARY KEY ("studentId", "courseId");


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

