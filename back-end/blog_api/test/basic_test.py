from abc import ABC
import unittest
import tempfile
from blog_api import create_app, db
import os

class BasicTestCase(ABC, unittest.TestCase):
    def setUp(self) -> None:
        test_config = {}
        self.test_db_file = tempfile.mkstemp()[1]
        test_config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{self.test_db_file}"
        test_config["TESTING"] = True
        self.app = create_app(alt_config=test_config)

    def tearDown(self) -> None:
        os.remove(self.test_db_file)
