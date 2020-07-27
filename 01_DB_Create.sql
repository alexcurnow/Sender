USE [master]
GO

IF db_id('Sender') IS NULL
	CREATE DATABASE Sender
GO

USE [Sender]
GO


DROP TABLE IF EXISTS [Comment];
DROP TABLE IF EXISTS [Move];
DROP TABLE IF EXISTS [UserClimbSolved];
DROP TABLE IF EXISTS [Climb];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Grade];
DROP TABLE IF EXISTS [State];
DROP TABLE IF EXISTS [Limb];
GO


CREATE TABLE [Limb] (
  [Id] int IDENTITY PRIMARY KEY NOT NULL,
  [Name] nvarchar(50) NOT NULL
)
GO

CREATE TABLE [Grade] (
  [Id] int IDENTITY PRIMARY KEY NOT NULL,
  [Name] nvarchar(50) NOT NULL
)
GO

CREATE TABLE [State] (
  [Id] int IDENTITY PRIMARY KEY NOT NULL,
  [Acronym] nvarchar(2) NOT NULL,
  [Name] nvarchar(50) NOT NULL
)
GO

CREATE TABLE [UserProfile] (
  [Id] int IDENTITY PRIMARY KEY NOT NULL,
  [FirebaseUserId] nvarchar(255) NOT NULL,
  [DisplayName] nvarchar(50) NOT NULL,
  [Email] nvarchar(50) NOT NULL,
	[Password] nvarchar(50) NOT NULL,
  [FirstName] nvarchar(50) NOT NULL,
  [LastName] nvarchar(50) NOT NULL,
  [ImageLocation] nvarchar(255) NOT NULL

  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)
GO

CREATE TABLE [Climb] (
  [Id] int IDENTITY PRIMARY KEY NOT NULL,
  [UserProfileId] int NOT NULL,
  [GradeId] int NOT NULL,
  [ImageUrl] nvarchar(255) NOT NULL,
  [VideoUrl] nvarchar(255),
  [Gym] nvarchar(255) NOT NULL,
  [City] nvarchar(255) NOT NULL,
  [StateId] int NOT NULL,
  [Notes] text,
  [DateCreated] datetime NOT NULL

  CONSTRAINT FK_Climb_UserProfile FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile]([Id]),
  CONSTRAINT FK_Climb_Grade FOREIGN KEY ([GradeId]) REFERENCES [Grade]([Id]),
  CONSTRAINT FK_Climb_State FOREIGN KEY (StateId) REFERENCES [State](Id),

)
GO

CREATE TABLE [Move] (
  [Id] int IDENTITY PRIMARY KEY NOT NULL,
  [ClimbId] int NOT NULL,
  [LimbId] int NOT NULL,
  [SequenceNumber] int NOT NULL,
  [Xcoord] int NOT NULL,
  [Ycoord] int NOT NULL,
  [Radius] int NOT NULL

  CONSTRAINT FK_Move_Climb FOREIGN KEY (ClimbId) REFERENCES Climb(Id),
  CONSTRAINT FK_Move_Limb FOREIGN KEY (LimbId) REFERENCES Limb(Id),

)
GO

CREATE TABLE [Comment] (
  [Id] int IDENTITY PRIMARY KEY NOT NULL,
  [UserProfileId] int NOT NULL,
  [ClimbId] int NOT NULL,
  [Message] text NOT NULL,
  [DateCreated] datetime NOT NULL

  CONSTRAINT FK_Comment_UserProfile FOREIGN KEY (UserProfileId) REFERENCES UserProfile(Id),
  CONSTRAINT FK_Comment_Climb FOREIGN KEY (ClimbId) REFERENCES Climb(Id),
)
GO

CREATE TABLE [UserClimbSolved] (
  [Id] int IDENTITY PRIMARY KEY NOT NULL,
  [UserProfileId] int NOT NULL,
  [ClimbId] int NOT NULL

  CONSTRAINT FK_UserClimbSolved_UserProfile FOREIGN KEY (UserProfileId) REFERENCES UserProfile(Id),
  CONSTRAINT FK_UserClimbSolved_Climb FOREIGN KEY (ClimbId) REFERENCES Climb(Id),
)
GO



SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile]
	([Id], [FirebaseUserId], [DisplayName], [Email], [Password], [FirstName], [LastName], [ImageLocation])
VALUES
	(1, 'F9SmhabVZ6cXIiCq91GFk6VtfGP2', 'alexcurnow', 'alex@alex.com', 'alex@a', 'Alex', 'Curnow', 'https://api.adorable.io/avatars/105/alex@alex.com'),
	(2, 'PlqygTbWU1MNnuypKKd9PVuuKuB2', 'byeckyalou', 'becky@becky.com', 'becky@', 'Becky', 'Roubos', 'https://api.adorable.io/avatars/105/becky@becky.com')
SET IDENTITY_INSERT [UserProfile] OFF


SET IDENTITY_INSERT [Limb] ON
INSERT INTO [Limb] ([Id], [Name])
VALUES
	(1, 'Right Hand'),
	(2, 'Left Hand'),
	(3, 'Right Foot'),
	(4, 'Left Foot'),
	(5, 'Match Hands'),
	(6, 'Match Feet')
SET IDENTITY_INSERT [Limb] OFF


SET IDENTITY_INSERT [Grade] ON
INSERT INTO [Grade] ([Id], [Name])
VALUES
	(1, 'V0'),
	(2, 'V1'),
	(3, 'V2'),
	(4, 'V3'),
	(5, 'V4'),
	(6, 'V5'),
	(7, 'V6'),
	(8, 'V7'),
	(9, 'V8'),
	(10, 'V9'),
	(11, 'V10'),
	(12, 'V11')
SET IDENTITY_INSERT [Grade] OFF


SET IDENTITY_INSERT [STATE] ON
INSERT INTO [State] ([Id], [Acronym], [Name])
VALUES
	(1, 'AL', 'Alabama'),
	(2, 'AK', 'Alaska'),
	(3, 'AL', 'Alabama'),
	(4, 'AZ', 'Arizona'),
	(5, 'AR', 'Arkansas'),
	(6, 'CA', 'California'),
	(7, 'CO', 'Colorado'),
	(8, 'CT', 'Connecticut'),
	(9, 'DE', 'Delaware'),
	(10, 'DC', 'District of Columbia'),
	(11, 'FL', 'Florida'),
	(12, 'GA', 'Georgia'),
	(13, 'HI', 'Hawaii'),
	(14, 'ID', 'Idaho'),
	(15, 'IL', 'Illinois'),
	(16, 'IN', 'Indiana'),
	(17, 'IA', 'Iowa'),
	(18, 'KS', 'Kansas'),
	(19,'KY', 'Kentucky'),
	(20, 'LA', 'Louisiana'),
	(21, 'ME', 'Maine'),
	(22, 'MD', 'Maryland'),
	(23, 'MA', 'Massachusetts'),
	(24, 'MI', 'Michigan'),
	(25, 'MN', 'Minnesota'),
	(26, 'MS', 'Mississippi'),
	(27, 'MO', 'Missouri'),
	(28, 'MT', 'Montana'),
	(29, 'NE', 'Nebraska'),
	(30, 'NV', 'Nevada'),
	(31, 'NH', 'New Hampshire'),
	(32, 'NJ', 'New Jersey'),
	(33, 'NM', 'New Mexico'),
	(34, 'NY', 'New York'),
	(35, 'NC', 'North Carolina'),
	(36, 'ND', 'North Dakota'),
	(37, 'OH', 'Ohio'),
	(38, 'OK', 'Oklahoma'),
	(39, 'OR', 'Oregon'),
	(40, 'PA', 'Pennsylvania'),
	(41, 'PR', 'Puerto Rico'),
	(42, 'RI', 'Rhode Island'),
	(43, 'SC', 'South Carolina'),
	(44, 'SD', 'South Dakota'),
	(45, 'TN', 'Tennessee'),
	(46, 'TX', 'Texas'),
	(47, 'UT', 'Utah'),
	(48, 'VT', 'Vermont'),
	(49, 'VA', 'Virginia'),
	(50, 'WA', 'Washington'),
	(51, 'WV', 'West Virginia'),
	(52, 'WI', 'Wisconsin'),
	(53, 'WY', 'Wyoming')
SET IDENTITY_INSERT [State] OFF