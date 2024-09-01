package com.duvi.blogservice.service;

import com.duvi.blogservice.model.Comment;
import com.duvi.blogservice.model.dto.CommentDTO;
import com.duvi.blogservice.model.dto.SetCommentDTO;
import com.duvi.blogservice.model.exceptions.CommentNotFoundException;
import com.duvi.blogservice.model.exceptions.EntityDoesNotExistsException;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.endpoints.internal.Value;

import java.util.List;

@Service
public interface CommentService {

    //Create DTO
    CommentDTO createDTO(Comment comment);
    //Basic CRUD
    CommentDTO createComment(String body, String username, String slug) throws EntityDoesNotExistsException;
    List<CommentDTO> getComments();
    CommentDTO getCommentById(Long id) throws EntityDoesNotExistsException;
    CommentDTO updateComment(Long commentId, String body) throws EntityDoesNotExistsException;
    void deleteComment(Long id) throws EntityDoesNotExistsException;

    //Operations with Users

    List<CommentDTO> getCommentOfUser(String username) throws EntityDoesNotExistsException;
    List<CommentDTO> getCommentOfUser(Long userId) throws EntityDoesNotExistsException;

//    Operations with Articles
    List<CommentDTO> getCommentOfArticle(String slug) throws EntityDoesNotExistsException;
    List<CommentDTO> getCommentOfArticle(Long articleId) throws EntityDoesNotExistsException;

}
