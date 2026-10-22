-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('student', 'counsellor', 'admin');

-- CreateEnum
CREATE TYPE "LeadType" AS ENUM ('school_invite', 'contact', 'counselling');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('new', 'contacted', 'converted', 'closed');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "BookingMode" AS ENUM ('phone', 'video', 'office');

-- CreateEnum
CREATE TYPE "Community" AS ENUM ('OC', 'BC', 'BCM', 'MBC', 'SC', 'SCA', 'ST');

-- CreateEnum
CREATE TYPE "StreamKind" AS ENUM ('science', 'commerce', 'arts', 'vocational');

-- CreateEnum
CREATE TYPE "ClassLevel" AS ENUM ('class10', 'class11', 'class12');

-- CreateEnum
CREATE TYPE "CareerEntry" AS ENUM ('after10', 'after12');

-- CreateEnum
CREATE TYPE "CollegeType" AS ENUM ('government', 'aided', 'autonomous', 'self_financing', 'deemed');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('photo', 'video', 'press');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('draft', 'published');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('female', 'male', 'any');

-- CreateEnum
CREATE TYPE "ToolKind" AS ENUM ('cutoff', 'predictor', 'quiz', 'scholarship');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "role" "Role" NOT NULL DEFAULT 'student',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "classLevel" "ClassLevel",
    "school" TEXT,
    "district" TEXT,
    "community" "Community",
    "marks" JSONB,
    "interests" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedResult" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tool" "ToolKind" NOT NULL,
    "title" TEXT,
    "input" JSONB NOT NULL,
    "output" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SavedResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "type" "LeadType" NOT NULL,
    "status" "LeadStatus" NOT NULL DEFAULT 'new',
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "schoolName" TEXT,
    "classLevel" TEXT,
    "district" TEXT,
    "message" TEXT,
    "preferredTime" TEXT,
    "source" TEXT,
    "notes" TEXT,
    "assignedToId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CounsellingSlot" (
    "id" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "mode" "BookingMode" NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 1,
    "counsellorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CounsellingSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "slotId" TEXT NOT NULL,
    "userId" TEXT,
    "leadId" TEXT,
    "status" "BookingStatus" NOT NULL DEFAULT 'pending',
    "cutoff" DOUBLE PRECISION,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stream" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameTa" TEXT,
    "kind" "StreamKind" NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stream_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Career" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleTa" TEXT,
    "streamId" TEXT NOT NULL,
    "entry" "CareerEntry" NOT NULL,
    "cluster" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "eligibility" TEXT NOT NULL,
    "exams" JSONB NOT NULL,
    "topColleges" JSONB NOT NULL,
    "scholarshipNote" TEXT,
    "salaryMin" INTEGER,
    "salaryMax" INTEGER,
    "futureScope" TEXT NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'published',
    "needsReview" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Career_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scholarship" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameTa" TEXT,
    "provider" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "classLevels" JSONB NOT NULL,
    "communities" JSONB NOT NULL,
    "incomeMax" INTEGER,
    "gender" "Gender" NOT NULL DEFAULT 'any',
    "streams" JSONB NOT NULL,
    "link" TEXT,
    "deadline" TEXT,
    "isSample" BOOLEAN NOT NULL DEFAULT false,
    "needsReview" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scholarship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "College" (
    "id" TEXT NOT NULL,
    "tneaCode" TEXT,
    "name" TEXT NOT NULL,
    "shortName" TEXT,
    "district" TEXT NOT NULL,
    "type" "CollegeType" NOT NULL,
    "website" TEXT,
    "logoUrl" TEXT,
    "isSample" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "College_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameTa" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollegeBranch" (
    "id" TEXT NOT NULL,
    "collegeId" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,
    "intake" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollegeBranch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CutoffHistory" (
    "id" TEXT NOT NULL,
    "collegeBranchId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "round" INTEGER NOT NULL DEFAULT 1,
    "community" "Community" NOT NULL,
    "closingCutoff" DOUBLE PRECISION NOT NULL,
    "closingRank" INTEGER,
    "isSample" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CutoffHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChoiceList" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChoiceList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChoiceListItem" (
    "id" TEXT NOT NULL,
    "listId" TEXT NOT NULL,
    "collegeBranchId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChoiceListItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizQuestion" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "textTa" TEXT,
    "options" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuizQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizResult" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "answers" JSONB NOT NULL,
    "topClusters" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuizResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogCategory" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameTa" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleTa" TEXT,
    "excerpt" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "coverUrl" TEXT,
    "pdfUrl" TEXT,
    "readingMins" INTEGER NOT NULL DEFAULT 3,
    "categoryId" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'draft',
    "comingSoon" BOOLEAN NOT NULL DEFAULT false,
    "needsReview" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "town" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "quoteTa" TEXT,
    "avatarUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "roleTa" TEXT,
    "bio" TEXT,
    "photoUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaItem" (
    "id" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "title" TEXT NOT NULL,
    "titleTa" TEXT,
    "url" TEXT,
    "youtubeId" TEXT,
    "year" INTEGER NOT NULL,
    "event" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerLogo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartnerLogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Faq" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "questionTa" TEXT,
    "answer" TEXT NOT NULL,
    "answerTa" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "needsReview" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_userId_key" ON "StudentProfile"("userId");

-- CreateIndex
CREATE INDEX "SavedResult_userId_tool_idx" ON "SavedResult"("userId", "tool");

-- CreateIndex
CREATE INDEX "Lead_type_status_idx" ON "Lead"("type", "status");

-- CreateIndex
CREATE INDEX "Lead_createdAt_idx" ON "Lead"("createdAt");

-- CreateIndex
CREATE INDEX "Lead_assignedToId_idx" ON "Lead"("assignedToId");

-- CreateIndex
CREATE INDEX "CounsellingSlot_startsAt_idx" ON "CounsellingSlot"("startsAt");

-- CreateIndex
CREATE INDEX "Booking_status_idx" ON "Booking"("status");

-- CreateIndex
CREATE INDEX "Booking_slotId_idx" ON "Booking"("slotId");

-- CreateIndex
CREATE INDEX "Booking_userId_idx" ON "Booking"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Stream_slug_key" ON "Stream"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Career_slug_key" ON "Career"("slug");

-- CreateIndex
CREATE INDEX "Career_streamId_idx" ON "Career"("streamId");

-- CreateIndex
CREATE INDEX "Career_cluster_idx" ON "Career"("cluster");

-- CreateIndex
CREATE INDEX "Career_status_idx" ON "Career"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Scholarship_slug_key" ON "Scholarship"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "College_tneaCode_key" ON "College"("tneaCode");

-- CreateIndex
CREATE INDEX "College_district_idx" ON "College"("district");

-- CreateIndex
CREATE INDEX "College_type_idx" ON "College"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_code_key" ON "Branch"("code");

-- CreateIndex
CREATE INDEX "CollegeBranch_branchId_idx" ON "CollegeBranch"("branchId");

-- CreateIndex
CREATE UNIQUE INDEX "CollegeBranch_collegeId_branchId_key" ON "CollegeBranch"("collegeId", "branchId");

-- CreateIndex
CREATE INDEX "CutoffHistory_community_year_closingCutoff_idx" ON "CutoffHistory"("community", "year", "closingCutoff");

-- CreateIndex
CREATE UNIQUE INDEX "CutoffHistory_collegeBranchId_year_round_community_key" ON "CutoffHistory"("collegeBranchId", "year", "round", "community");

-- CreateIndex
CREATE INDEX "ChoiceList_userId_idx" ON "ChoiceList"("userId");

-- CreateIndex
CREATE INDEX "ChoiceListItem_listId_position_idx" ON "ChoiceListItem"("listId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "ChoiceListItem_listId_collegeBranchId_key" ON "ChoiceListItem"("listId", "collegeBranchId");

-- CreateIndex
CREATE INDEX "QuizQuestion_order_idx" ON "QuizQuestion"("order");

-- CreateIndex
CREATE INDEX "QuizResult_userId_idx" ON "QuizResult"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BlogCategory_slug_key" ON "BlogCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");

-- CreateIndex
CREATE INDEX "BlogPost_status_publishedAt_idx" ON "BlogPost"("status", "publishedAt");

-- CreateIndex
CREATE INDEX "BlogPost_categoryId_idx" ON "BlogPost"("categoryId");

-- CreateIndex
CREATE INDEX "Testimonial_published_order_idx" ON "Testimonial"("published", "order");

-- CreateIndex
CREATE INDEX "TeamMember_published_order_idx" ON "TeamMember"("published", "order");

-- CreateIndex
CREATE INDEX "MediaItem_type_year_idx" ON "MediaItem"("type", "year");

-- CreateIndex
CREATE INDEX "Faq_published_order_idx" ON "Faq"("published", "order");

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedResult" ADD CONSTRAINT "SavedResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CounsellingSlot" ADD CONSTRAINT "CounsellingSlot_counsellorId_fkey" FOREIGN KEY ("counsellorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "CounsellingSlot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Career" ADD CONSTRAINT "Career_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "Stream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollegeBranch" ADD CONSTRAINT "CollegeBranch_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollegeBranch" ADD CONSTRAINT "CollegeBranch_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CutoffHistory" ADD CONSTRAINT "CutoffHistory_collegeBranchId_fkey" FOREIGN KEY ("collegeBranchId") REFERENCES "CollegeBranch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChoiceList" ADD CONSTRAINT "ChoiceList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChoiceListItem" ADD CONSTRAINT "ChoiceListItem_listId_fkey" FOREIGN KEY ("listId") REFERENCES "ChoiceList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChoiceListItem" ADD CONSTRAINT "ChoiceListItem_collegeBranchId_fkey" FOREIGN KEY ("collegeBranchId") REFERENCES "CollegeBranch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizResult" ADD CONSTRAINT "QuizResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "BlogCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

