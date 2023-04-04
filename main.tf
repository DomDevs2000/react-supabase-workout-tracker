provider "aws" {
  region = "eu-west-2"
}

resource "aws_s3_bucket" "workout-tracker" {
  bucket = "dom-devs-workout-tracker"
}
resource "aws_s3_bucket_policy" "workout-tracker" {

  bucket = aws_s3_bucket.workout-tracker.id
  policy = <<POLICY
{
         "Version": "2012-10-17",

    "Statement": [

        {

            "Sid": "PublicReadGetObject",

            "Effect": "Allow",

            "Principal": "*",

            "Action": "s3:GetObject",

            "Resource": "arn:aws:s3:::dom-devs-workout-tracker"

        }

    ]
}
POLICY
}

resource "aws_s3_bucket_acl" "bucket-acl" {
  bucket = aws_s3_bucket.workout-tracker.id
  acl    = "public-read"
}

resource "aws_s3_bucket_website_configuration" "bucket-config" {
  bucket = aws_s3_bucket.workout-tracker.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }

  routing_rule {
    condition {
      key_prefix_equals = "docs/"
    }
    redirect {
      replace_key_prefix_with = "documents/"
    }
  }
}